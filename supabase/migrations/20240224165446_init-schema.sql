create table
    users (
        id bigint primary key generated always as identity not null,
        firstName text,
        lastName text,
        email varchar not null unique,
        password text not null,
        created_at timestamp not null default now(),
        updated_at timestamp not null default now()
);
