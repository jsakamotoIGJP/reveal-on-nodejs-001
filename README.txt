## System Requirements

- Node.js
- Docker

# Start

    docker run --name tmp_postgres --rm -p 5432:5432 -d jsakamotoigjp/stock-items-on-postgres:laest

    npm ci
    npm start

# Stop

    # Enter ^+C to stop the Reveal server process.

    docker stop tmp_postgres
