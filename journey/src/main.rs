// ErgoLlama Application

use reqwest::{self, Response, Error};
use serde::{Deserialize, Serialize};

// Included API Calls

mod api_calls;

use api_calls::get_token; // Get Token Function

#[tokio::main]
async fn main() -> Result<(), reqwest::Error> {
    let addy: String = "9eo3TX7MXiNn9xbHTrgK21dEbQbSDpJNj9ybo3deoubzYVHkjD8".to_string();

    println!("Hello World!");

    get_token(addy).await?;

    Ok(())
}