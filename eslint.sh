#!/usr/bin/env bash

cd "$(dirname "$0")/frontend"
args=()
for arg in "$@"; do
    processed_arg="${arg/#frontend\//./}"
    args+=("$processed_arg")
done
pnpm tsc --noEmit && pnpm eslint "${args[@]}"  # && pnpm prettier src --list-different
