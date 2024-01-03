CREATE SCHEMA identity;

CREATE TABLE identity.user (
    id uuid NOT NULL,
    name text NOT NULL,
    display_name text NOT NULL,
    prf_first_salt bytea NULL,
    CONSTRAINT pk_user PRIMARY KEY (id)
);

CREATE TABLE identity.credential (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    raw_id bytea NOT NULL,
    public_key bytea NOT NULL,
    transports text NULL,
    key_derivation_salt bytea NOT NULL,
    encrypted_key bytea NULL,
    encrypted_key_iv bytea NULL,
    CONSTRAINT pk_credential PRIMARY KEY (id),
    CONSTRAINT fk_secret_user FOREIGN KEY (user_id) REFERENCES identity.user(id)
);

CREATE SCHEMA secret

CREATE TABLE secret.secret (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    content bytea NOT NULL,
    iv bytea NOT NULL,
    CONSTRAINT pk_secret PRIMARY KEY (id),
    CONSTRAINT fk_secret_user FOREIGN KEY (user_id) REFERENCES identity.user(id)
);