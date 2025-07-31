#!/bin/bash

# Script untuk menjalankan seeding database
# Usage: ./seed.sh [dev|prod]

# Default ke development jika tidak ada argumen
ENVIRONMENT=${1:-dev}

echo "Running database setup for $ENVIRONMENT environment..."

# Jalankan schema dasar
psql -f scripts/001-schema.sql

# Jalankan seed production (selalu dijalankan)
psql -f scripts/002-seed-production.sql

# Jika development, jalankan seed development
if [ "$ENVIRONMENT" = "dev" ]; then
    echo "Adding development data..."
    psql -f scripts/003-seed-development.sql
fi

echo "Database setup completed!"
