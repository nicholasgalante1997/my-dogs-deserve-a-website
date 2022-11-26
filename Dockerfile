FROM rust:1.65.0

RUN mkdir -p /app 

WORKDIR /app

COPY ./src/ ./src/
COPY Cargo.toml .
COPY Cargo.lock .
COPY ./webapp/build/ ./webapp/build/
COPY ./.env .
COPY README.md .

RUN cargo build --release

EXPOSE 9000

CMD ["./target/release/my-dogs-deserve-a-website"]