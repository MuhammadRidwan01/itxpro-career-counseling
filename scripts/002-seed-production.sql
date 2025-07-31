-- Production seed data
-- Contains only essential data needed for production

-- Insert default admin user (password: change_this_in_production)
INSERT INTO "users" ("id", "email", "password", "role", "createdAt", "updatedAt") 
VALUES (
    'admin_001', 
    'admin@itxpro.sch.id', 
    '$2a$12$LQv3c1yqBwEHFl5yfgAEXOvyOXLIX6VvxI6aNp3yvAEXOvyOXLIX6V', -- Change this password in production
    'ADMIN', 
    CURRENT_TIMESTAMP, 
    CURRENT_TIMESTAMP
) ON CONFLICT ("email") DO NOTHING;

-- Add any other essential production data here
-- For example: default settings, required reference data, etc.
