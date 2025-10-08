#!/bin/bash

# Frontend Unified - Deployment Script
# Supports multiple deployment strategies for the monorepo

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
CLIENTS=("gcpl" "samsonite" "bowlers" "bunge")
BUILD_DIR="dist"
DEPLOY_MODE=${1:-"single"}  # single, multi, or client-specific
TARGET_CLIENT=${2:-""}

# Functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

show_usage() {
    echo "Usage: $0 [MODE] [CLIENT]"
    echo ""
    echo "Modes:"
    echo "  single     - Single build serving all clients (default)"
    echo "  multi      - Separate builds for each client"
    echo "  client     - Build for specific client only"
    echo ""
    echo "Examples:"
    echo "  $0 single                    # Single deployment"
    echo "  $0 multi                     # Multi-client deployment"
    echo "  $0 client gcpl              # Deploy only GCPL client"
    echo ""
    echo "Available clients: ${CLIENTS[*]}"
}

validate_client() {
    local client=$1
    for valid_client in "${CLIENTS[@]}"; do
        if [[ "$client" == "$valid_client" ]]; then
            return 0
        fi
    done
    return 1
}

clean_build_dir() {
    log_info "Cleaning build directory..."
    rm -rf $BUILD_DIR
    mkdir -p $BUILD_DIR
}

install_dependencies() {
    log_info "Installing dependencies..."
    npm ci --silent
}

run_tests() {
    log_info "Running tests..."
    npm run test -- --watchAll=false --coverage=false
}

lint_code() {
    log_info "Linting code..."
    npm run lint
}

build_single() {
    log_info "Building single deployment (serves all clients)..."
    npm run build
    log_success "Single build completed"
}

build_multi() {
    log_info "Building multi-client deployment..."
    
    for client in "${CLIENTS[@]}"; do
        log_info "Building for client: $client"
        npm run build:$client
        
        if [ $? -eq 0 ]; then
            log_success "Build completed for $client"
        else
            log_error "Build failed for $client"
            exit 1
        fi
    done
    
    log_success "Multi-client build completed"
}

build_client() {
    local client=$1
    
    if ! validate_client "$client"; then
        log_error "Invalid client: $client"
        log_error "Available clients: ${CLIENTS[*]}"
        exit 1
    fi
    
    log_info "Building for client: $client"
    npm run build:$client
    
    if [ $? -eq 0 ]; then
        log_success "Build completed for $client"
    else
        log_error "Build failed for $client"
        exit 1
    fi
}

analyze_bundle() {
    log_info "Analyzing bundle size..."
    npm run analyze
}

create_deployment_info() {
    local info_file="$BUILD_DIR/deployment-info.json"
    
    log_info "Creating deployment info..."
    
    cat > "$info_file" << EOF
{
  "deploymentMode": "$DEPLOY_MODE",
  "targetClient": "$TARGET_CLIENT",
  "buildTime": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "version": "$(npm pkg get version | tr -d '"')",
  "gitCommit": "$(git rev-parse HEAD 2>/dev/null || echo 'unknown')",
  "gitBranch": "$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo 'unknown')",
  "nodeVersion": "$(node --version)",
  "npmVersion": "$(npm --version)",
  "clients": $(printf '%s\n' "${CLIENTS[@]}" | jq -R . | jq -s .)
}
EOF
    
    log_success "Deployment info created: $info_file"
}

validate_build() {
    log_info "Validating build output..."
    
    case $DEPLOY_MODE in
        "single")
            if [ ! -d "$BUILD_DIR" ] || [ -z "$(ls -A $BUILD_DIR)" ]; then
                log_error "Build directory is empty"
                exit 1
            fi
            ;;
        "multi")
            for client in "${CLIENTS[@]}"; do
                if [ ! -d "$BUILD_DIR/$client" ]; then
                    log_error "Build directory missing for client: $client"
                    exit 1
                fi
            done
            ;;
        "client")
            if [ ! -d "$BUILD_DIR/$TARGET_CLIENT" ]; then
                log_error "Build directory missing for client: $TARGET_CLIENT"
                exit 1
            fi
            ;;
    esac
    
    log_success "Build validation passed"
}

deploy_to_staging() {
    log_info "Deploying to staging environment..."
    
    # Add your staging deployment logic here
    # Examples:
    # - Upload to S3
    # - Deploy to Netlify
    # - Push to staging server
    # - Update CDN
    
    log_warning "Staging deployment not configured"
}

deploy_to_production() {
    log_info "Deploying to production environment..."
    
    # Add your production deployment logic here
    # Examples:
    # - Upload to production S3 bucket
    # - Deploy to production server
    # - Update production CDN
    # - Notify team
    
    log_warning "Production deployment not configured"
}

# Main execution
main() {
    log_info "Starting deployment process..."
    log_info "Mode: $DEPLOY_MODE"
    
    # Validate arguments
    case $DEPLOY_MODE in
        "single"|"multi")
            ;;
        "client")
            if [ -z "$TARGET_CLIENT" ]; then
                log_error "Client name required for client-specific deployment"
                show_usage
                exit 1
            fi
            ;;
        "help"|"-h"|"--help")
            show_usage
            exit 0
            ;;
        *)
            log_error "Invalid deployment mode: $DEPLOY_MODE"
            show_usage
            exit 1
            ;;
    esac
    
    # Pre-build steps
    clean_build_dir
    install_dependencies
    
    # Quality checks
    lint_code
    run_tests
    
    # Build process
    case $DEPLOY_MODE in
        "single")
            build_single
            ;;
        "multi")
            build_multi
            ;;
        "client")
            build_client "$TARGET_CLIENT"
            ;;
    esac
    
    # Post-build steps
    validate_build
    create_deployment_info
    
    # Optional: Analyze bundle (uncomment if needed)
    # analyze_bundle
    
    log_success "Deployment preparation completed!"
    log_info "Build artifacts are ready in: $BUILD_DIR"
    
    # Deployment options (uncomment as needed)
    # deploy_to_staging
    # deploy_to_production
    
    log_success "Deployment script finished successfully!"
}

# Run main function
main "$@"

