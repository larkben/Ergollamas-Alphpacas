// ErgoLlama Application

// https://api.ergoplatform.com/api/v1/addresses/9eo3TX7MXiNn9xbHTrgK21dEbQbSDpJNj9ybo3deoubzYVHkjD8/balance/confirmed

use reqwest::{self, Response, Error};
use serde::{Deserialize, Serialize};

// Deserialization
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

// Fetches the Token
async fn get_token(address: String) -> Result<(), reqwest::Error> {
    let api_call = format!(
        "https://api.ergoplatform.com/api/v1/addresses/{}/balance/confirmed",
        address
    );

    let response = reqwest::get(&api_call).await?.json::<WalletOut>().await?;

    println!("{:#?}", response);

    Ok(())
}

#[tokio::main]
async fn main() -> Result<(), reqwest::Error> {
    let addy: String = "9eo3TX7MXiNn9xbHTrgK21dEbQbSDpJNj9ybo3deoubzYVHkjD8".to_string();

    println!("Hello World!");

    get_token(addy).await?;

    Ok(())
}