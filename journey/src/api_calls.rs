use reqwest::{self, Error};
use serde::{Deserialize, Serialize};

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

#[derive(Serialize, Deserialize, Debug)]
struct Asset {
    #[serde(rename = "tokenId")]
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
    R5: String,
    R6: String,
    R8: String,
    R7: String,
    R9: String,
    R4: String,
}

#[derive(Serialize, Deserialize, Debug)]
struct MyStruct {
    id: String,
    txId: String,
    value: u64,
    index: u64,
    creationHeight: u64,
    ergoTree: String,
    address: String,
    assets: Vec<Asset>,
    additionalRegisters: AdditionalRegisters,
    spentTransactionId: String,
    mainChain: bool,
}

pub async fn get_token(address: String) -> Result<(), reqwest::Error> {
    let test_token_id: String = "8cf4295cf2eb3a7b6c2a44fc00483fb7101c1818b36f0b2fc807fe082e5f9853".to_string();

    let wallet_call = format!(
        "https://api.ergoplatform.com/api/v1/addresses/{}/balance/confirmed",
        address
    );

    let response = reqwest::get(&wallet_call).await?.json::<WalletOut>().await?;

    for token in response.tokens {
        let token_id = token.token_id;

        let token_issue: String = format!(
            "https://api.ergoplatform.com/api/v0/assets/{}/issuingBox",
            token_id
        );

        let http_response = reqwest::get(&token_issue).await?;
        let response = http_response.json::<Vec<MyStruct>>().await?;

        for item in response {

            let token_address: String = item.address;
            
            if token_address == "9i27sKZ1gdZtnkbEsL1jkbnosZh3pHi9tZiwMLmi6tcwjmRQMhz" {
                println!("The Token is Valid");
            }

            else {
                println!("The Token is Invalid");
            }
        }

        //println!("The token id is {}", token_id);
    }

    Ok(())
}