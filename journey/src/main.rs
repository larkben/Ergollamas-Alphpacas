// ErgoLlama Application

// https://api.ergoplatform.com/api/v1/addresses/9eo3TX7MXiNn9xbHTrgK21dEbQbSDpJNj9ybo3deoubzYVHkjD8/balance/confirmed

#[cfg(target_arch = "x86_64")]
#[cfg(feature = "stdsimd")]
use std::arch::x86_64::_mm_mask_ror_epi32;

use reqwest::{self, Response, Error};
use serde::{Deserialize, Serialize};

// First API CALL

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

// SECOND API CALL
#[derive(Debug, serde::Deserialize)]
struct Asset {
    #[serde(rename = "tokenId")]
    token_id: String,
    index: u32,
    amount: u32,
    name: String,
    decimals: u32,
    #[serde(rename = "type")]
    token_type: String,
}

#[derive(Debug, serde::Deserialize)]
struct AdditionalRegisters {
    #[serde(rename = "R5")]
    r_5: String,
    #[serde(rename = "R6")]
    r_6: String,
    #[serde(rename = "R8")]
    r_8: String,
    #[serde(rename = "R7")]
    r_7: String,
    #[serde(rename = "R9")]
    r_9: String,
    #[serde(rename = "R4")]
    r_4: String,
}

#[derive(Debug, serde::Deserialize)]
struct Item {
    id: String,
    #[serde(rename = "txId")]
    tx_id: String,
    value: u32,
    index: u32,
    #[serde(rename = "creationHeight")]
    creation_height: u32,
    #[serde(rename = "ergoTree")]
    ergo_tree: String,
    address: String,
    assets: Vec<Asset>,
    #[serde(rename = "additionalRegisters")]
    additional_registers: AdditionalRegisters,
    #[serde(rename = "spentTransactionId")]
    spent_transaction_id: String,
    #[serde(rename = "mainChain")]
    main_chain: bool,
}

// Fetches the Token
async fn get_token(address: String) -> Result<(), reqwest::Error> {
    let test_token_id: String = "8cf4295cf2eb3a7b6c2a44fc00483fb7101c1818b36f0b2fc807fe082e5f9853".to_string();

    let wallet_call = format!(
        "https://api.ergoplatform.com/api/v1/addresses/{}/balance/confirmed",
        address
    );

    let response = reqwest::get(&wallet_call).await?.json::<WalletOut>().await?; // Notice the syntax here

    for token in response.tokens {
        let token_id = token.token_id;

        let token_issue: String = format!(
            "https://api.ergoplatform.com/api/v0/assets/{}/issuingBox", 
            token_id
        );

        //let issued_response: Item = reqwest::get(&token_issue).await?.json::<Item>().await?;

        /*
        if issued_response.address == "9i27sKZ1gdZtnkbEsL1jkbnosZh3pHi9tZiwMLmi6tcwjmRQMhz" {
            println!("This token is valid.");
        }
        else {
            println!("Token is invalid");
        }
        */
    }

    Ok(())
}

#[tokio::main]
async fn main() -> Result<(), reqwest::Error> {
    let addy: String = "9eo3TX7MXiNn9xbHTrgK21dEbQbSDpJNj9ybo3deoubzYVHkjD8".to_string();

    println!("Hello World!");

    get_token(addy).await?;

    Ok(())
}