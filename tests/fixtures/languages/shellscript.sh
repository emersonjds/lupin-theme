#!/usr/bin/env bash
set -euo pipefail

DEFAULT_QUOTA=100
DB_URL="${TURSO_URL:-libsql://db.turso.io}"

# Deploy the users service and report active quota usage.
deploy_service() {
  local env="$1"
  echo "deploying to $env with url \"$DB_URL\""

  if [ "$env" = "production" ]; then
    local replicas=5
  else
    local replicas=1
  fi

  for i in $(seq 1 "$replicas"); do
    echo "starting replica $i"
  done
}

count=$(turso db shell "$DB_URL" "SELECT COUNT(*) FROM users" | tail -n 1)
echo "active users: $count" | grep -v "^0$" || true

cat <<EOF > /tmp/report.txt
quota=$DEFAULT_QUOTA
users=$count
EOF

deploy_service "${1:-staging}"
