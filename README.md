# Coin Tracker

A basic Coin Tracker app that can:

## Features

- Show trending coins on hover
- Search coins
- View coin statistic
- View coin price chart & OHLC chart by range (currently: 7 days, 14 days, 30 days)

## Tech Stack

**Client:** Vite, React, MUI, Typescript

**Server:** NestJS, Axios, [Coingekko](https://docs.coingecko.com/v3.0.1/reference/coins-list) public API

## API Reference

#### Get all trending coins:

```http
  GET /coins/trending
```

#### Get coins list:

```http
  GET /coins/get-coins
```

| Path Parameter | Query Parameter | Type     | Description                                                                                                            |
| :------------- | :-------------- | :------- | :--------------------------------------------------------------------------------------------------------------------- |
| `None`         | `vs_currency`   | `string` | **Required**. Target [currency](https://docs.coingecko.com/v3.0.1/reference/simple-supported-currencies) of price data |

#### Get price chart by range:

```http
  GET /coins/price-chart-by-range/${id}
```

| Path Parameter | Query Parameter | Type     | Description                                                                                                            |
| :------------- | :-------------- | :------- | :--------------------------------------------------------------------------------------------------------------------- |
| `id`           |                 | `string` | **Required**. [coinId](https://docs.coingecko.com/v3.0.1/reference/coins-list)                                         |
|                | `vs_currency`   | `string` | **Required**. Target [currency](https://docs.coingecko.com/v3.0.1/reference/simple-supported-currencies) of price data |
|                | `from`          | `number` | **Required**. UNIX Date                                                                                                |
|                | `to`            | `number` | **Required**. UNIX Date                                                                                                |

#### Get OHLC chart by range:

```http
  GET /coins/get-ohlc-chart/${id}
```

| Path Parameter | Query Parameter | Type     | Description                                                                                                            |
| :------------- | :-------------- | :------- | :--------------------------------------------------------------------------------------------------------------------- |
| `id`           |                 | `string` | **Required**. [coinId](https://docs.coingecko.com/v3.0.1/reference/coins-list)                                         |
|                | `vs_currency`   | `string` | **Required**. Target [currency](https://docs.coingecko.com/v3.0.1/reference/simple-supported-currencies) of price data |
|                | `days`          | `string` | **Required**. Up to number of days ago                                                                                 |

## Run Locally

Clone the project

```bash
  git clone https://github.com/akirayorunoe/PhamHuyHoang-20240709.git
```

Running docker-compose

```bash
  docker-compose up -d
```

Frontend will start at

```bash
  http://localhost:5173/
```

Backend will start at

```bash
  http://localhost:3001/
```
