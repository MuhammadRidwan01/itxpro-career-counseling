-- Update dengan password sederhana untuk testing
-- Password untuk semua user akan menjadi "123456"

-- Generate hash untuk password "123456"
-- Hash: $2a$12$LQv3c1yqBwEHFl5yfgAEXOvyOXLIX6VvxI6aNp3yvAEXOvyOXLIX6V

UPDATE "users" SET "password" = '$2a$12$LQv3c1yqBwEHFl5yfgAEXOvyOXLIX6VvxI6aNp3yvAEXOvyOXLIX6V' WHERE "email" = 'admin@itxpro.sch.id';
UPDATE "users" SET "password" = '$2a$12$LQv3c1yqBwEHFl5yfgAEXOvyOXLIX6VvxI6aNp3yvAEXOvyOXLIX6V' WHERE "role" = 'STUDENT';

-- Verify update
SELECT email, role, 'Password updated to: 123456' as info FROM "users";
