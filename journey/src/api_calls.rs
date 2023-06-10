use reqwest::{self, Response, Error};
use serde::{Deserialize, Serialize};

// First API CALL
#[derive(Serialize, Deserialize, Debug)]
struct WalletOut {
    #[serde(rename = "nanoErgs")]
    nano_ergs: u64,
    tokens: Vec<TokenOut>,
}

#[derive(Deserialize, Debug, Serialize)]
struct TokenOut {
    #[serde(rename = "tokenId")]
    token_id: String,
    amount: u64,
    decimals: u64,
    name: String,
    #[serde(rename = "tokenType")]
    token_type: String,
}

// SECOND API CALL
#[derive(Serialize, Deserialize, Debug)]
struct Transaction {
    id: String,
    tx_id: String,
    value: u64,
    index: u64,
    creation_height: u64,
    ergo_tree: String,
    address: String,
    assets: Vec<TransactionAsset>,
    additional_registers: AdditionalRegisters,
    spent_transaction_id: String,
    main_chain: bool,
}

#[derive(Serialize, Deserialize, Debug)]
struct TransactionAsset {
    token_id: String,
    index: u64,
    amount: u64,
    name: String,
    decimals: u64,
    #[serde(rename = "type")]
    token_type: String,
}

#[derive(Serialize, Deserialize, Debug)]
struct AdditionalRegisters {
    r5: String,
    r6: String,
    r8: String,
    r7: String,
    r9: String,
    r4: String,
}

// FUNCTION
pub async fn get_token(address: String) -> Result<(), reqwest::Error> {
    let test_token_id: String = "8cf4295cf2eb3a7b6c2a44fc00483fb7101c1818b36f0b2fc807fe082e5f9853".to_string();

    let wallet_call = format!(
        "https://api.ergoplatform.com/api/v1/addresses/{}/balance/confirmed",
        address
    );

    let response = reqwest::get(&wallet_call).await?.json::<WalletOut>().await?;

    for token in response.tokens {
        let token_id = token.token_id;

        /*
        let token_issue: String = format!(
            "https://api.ergoplatform.com/api/v0/assets/{}/issuingBox", 
            token_id
        );

        let issued_response: Transaction = reqwest::get(&token_issue).await?.json::<Transaction>().await?;

        println!("The mint address is {}", issued_response.address);
        */

        println!("The token id is {}", token_id);
    }

    Ok(())
}

