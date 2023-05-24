var express = require('express');
var cors = require('cors');
var reveal = require('reveal-sdk-node');

const app = express();
app.use(cors()); // DEVELOPMENT only! In production, configure appropriately.

app.use(express.static('public'));

const authenticationProvider = async (userContext, dataSource) => {
    if (dataSource instanceof reveal.RVPostgresDataSource) {
        return new reveal.RVUsernamePasswordDataSourceCredential("postgres", "postgres");
    }
    return null;
}

const dataSourceProvider = async (userContext, dataSource) => {
    if (dataSource instanceof reveal.RVPostgresDataSource && dataSource.id === "PostgreInventryDb") {
        dataSource.host = "localhost";
        dataSource.database = "postgres";
    }
    return dataSource;
}

const dataSourceItemProvider = async (userContext, dataSourceItem) => {
    if (dataSourceItem instanceof reveal.RVPostgresDataSourceItem) {
        dataSourceProvider(userContext, dataSourceItem.dataSource);
        if (dataSourceItem.id === "StockItems") {
            dataSourceItem.table = "stock_items";
        }
    }
    return dataSourceItem;
}

const revealOptions = {
    authenticationProvider: authenticationProvider,
    dataSourceProvider: dataSourceProvider,
    dataSourceItemProvider: dataSourceItemProvider,
}

app.use('/', reveal(revealOptions));

app.listen(8080, () => {
    console.log(`Reveal server accepting http://localhost:8080/`);
});