// ErgoLlama Application

fn main() {
    for i in 0..1000000 {
        let hello: String = "hello".to_string();
        print!("\x1B[2J\x1B[1;1H"); // clearing the terminal screen
        println!("{}", i);
    }
}
