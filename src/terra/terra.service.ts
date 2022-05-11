import { Injectable } from '@nestjs/common';
import {
  MnemonicKey,
  LCDClient,
  Wallet,
  Coins,
  MsgSend,
  MsgExecuteContract,
} from '@terra-money/terra.js';
import * as fetch from 'isomorphic-fetch';

@Injectable()
export class TerraService {
  async getBalance(): Promise<any> {
    const gasPrices = await (
      await fetch('https://bombay-fcd.terra.dev/v1/txs/gas_prices')
    ).json();
    const gasPricesCoins = new Coins(gasPrices);

    const lcd = new LCDClient({
      URL: 'https://bombay-lcd.terra.dev/',
      chainID: 'bombay-12',
      gasPrices: gasPricesCoins,
      gasAdjustment: '1.5',
    });

    const address = 'terra1pg0pedwuzxwggf5lcz0ktsvdpe0hd2zcqkzl07';
    const [balance] = await lcd.bank.balance(address);
    console.log(balance.toData());
    return [balance];
  }
  async getBalanceCW20(): Promise<any> {
    const gasPrices = await (
      await fetch('https://bombay-fcd.terra.dev/v1/txs/gas_prices')
    ).json();
    const gasPricesCoins = new Coins(gasPrices);

    const lcd = new LCDClient({
      URL: 'https://bombay-lcd.terra.dev/',
      chainID: 'bombay-12',
      gasPrices: gasPricesCoins,
      gasAdjustment: '1.5',
    });
    const contract = 'terra1akx3p9ru0r0j075ddegwtvtv5mxmkxmf92l8e8';
    const address = 'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v';
    const response = await lcd.wasm.contractQuery(contract, {
      balance: { address: address },
    });
    console.log(response);
    return response;
  }
  async transfer(): Promise<any> {
    const mk = new MnemonicKey({
      mnemonic:
        'satisfy adjust timber high purchase tuition stool faith fine install that you unaware feed domain license impose boss human eager hat rent enjoy dawn',
    });
    const gasPrices = await fetch(
      'https://bombay-fcd.terra.dev/v1/txs/gas_prices',
    );
    console.log('step 3');
    const gasPricesJson = await gasPrices.json();
    const gasPricesCoins = new Coins(gasPricesJson);
    const terra = new LCDClient({
      URL: 'https://bombay-lcd.terra.dev/', // Use "https://lcd.terra.dev" for prod "http://localhost:1317" for localterra.
      chainID: 'bombay-12', // Use "columbus-5" for production or "localterra".
      gasPrices: gasPricesCoins,
      gasAdjustment: '1.5', // Increase gas price slightly so transactions go through smoothly.
    });
    const wallet = terra.wallet(mk);

    // Transfer 1 Luna.
    const send = new MsgSend(
      wallet.key.accAddress,
      'terra1pg0pedwuzxwggf5lcz0ktsvdpe0hd2zcqkzl07',
      { uluna: '1000000' },
    );

    const tx = await wallet.createAndSignTx({ msgs: [send] });
    const result = await terra.tx.broadcast(tx);

    console.log(result);
    return result;
  }

  async transferCW20(): Promise<any> {
    const mk = new MnemonicKey({
      mnemonic:
        'notice oak worry limit wrap speak medal online prefer cluster roof addict wrist behave treat actual wasp year salad speed social layer crew genius',
    });
    const gasPrices = await fetch(
      'https://bombay-fcd.terra.dev/v1/txs/gas_prices',
    );
    console.log('step 3');
    const gasPricesJson = await gasPrices.json();
    const gasPricesCoins = new Coins(gasPricesJson);
    const terra = new LCDClient({
      URL: 'https://bombay-lcd.terra.dev/', // Use "https://lcd.terra.dev" for prod "http://localhost:1317" for localterra.
      chainID: 'bombay-12', // Use "columbus-5" for production or "localterra".
      gasPrices: gasPricesCoins,
      gasAdjustment: '1.5', // Increase gas price slightly so transactions go through smoothly.
    });
    const wallet = terra.wallet(mk);
    const tokenAddress = 'terra1akx3p9ru0r0j075ddegwtvtv5mxmkxmf92l8e8';

    // Transfer 1 Luna.
    const cw20Send = new MsgExecuteContract(
      wallet.key.accAddress,
      tokenAddress,
      {
        transfer: {
          amount: '100',
          recipient: 'terra1pg0pedwuzxwggf5lcz0ktsvdpe0hd2zcqkzl07',
        },
      },
    );

    const tx = await wallet.createAndSignTx({ msgs: [cw20Send] });
    const result = await terra.tx.broadcast(tx);
    return result;
  }

  async mintCW20(): Promise<any> {
    const mk = new MnemonicKey({
      mnemonic:
        'notice oak worry limit wrap speak medal online prefer cluster roof addict wrist behave treat actual wasp year salad speed social layer crew genius',
    });

    const gasPrices = await fetch(
      'https://bombay-fcd.terra.dev/v1/txs/gas_prices',
    );
    console.log('step 3');
    const gasPricesJson = await gasPrices.json();
    const gasPricesCoins = new Coins(gasPricesJson);
    const terra = new LCDClient({
      URL: 'https://bombay-lcd.terra.dev/', // Use "https://lcd.terra.dev" for prod "http://localhost:1317" for localterra.
      chainID: 'bombay-12', // Use "columbus-5" for production or "localterra".
      gasPrices: gasPricesCoins,
      gasAdjustment: '1.5', // Increase gas price slightly so transactions go through smoothly.
    });

    const wallet = terra.wallet(mk);
    const tokenAddress = 'terra1akx3p9ru0r0j075ddegwtvtv5mxmkxmf92l8e8';
    const executeContract = new MsgExecuteContract(
      wallet.key.accAddress,
      tokenAddress,
      {
        mint: {
          recipient: 'terra1pg0pedwuzxwggf5lcz0ktsvdpe0hd2zcqkzl07',
          amount: '123',
        },
      },
    );
    console.log('step 5');

    const tx = await wallet.createAndSignTx({
      msgs: [executeContract],
    });
    console.log('step 6');

    const txResult = await terra.tx.broadcast(tx);
    console.log('step 7');

    console.log(txResult);
    return txResult;
  }

  async createTx(): Promise<any> {
    const mk = new MnemonicKey({
      mnemonic:
        'swift claim valley public noodle profit series forward frown dance front type lend note unit dentist finger fuel industry panicbronze private small front',
    });
    const gasPrices = await fetch(
      'https://bombay-fcd.terra.dev/v1/txs/gas_prices',
    );
    const gasPricesJson = await gasPrices.json();
    const gasPricesCoins = new Coins(gasPricesJson);
    const terra = new LCDClient({
      URL: 'https://bombay-lcd.terra.dev/', // Use "https://lcd.terra.dev" for prod "http://localhost:1317" for localterra.
      chainID: 'bombay-12', // Use "columbus-5" for production or "localterra".
      gasPrices: gasPricesCoins,
      gasAdjustment: '1.5', // Increase gas price slightly so transactions go through smoothly.
    });

    const wallet = terra.wallet(mk);
    const msg = new MsgSend(
      wallet.key.accAddress,
      'terra1pg0pedwuzxwggf5lcz0ktsvdpe0hd2zcqkzl07',
      '1000',
    );

    const tx = await wallet.createAndSignTx({
      msgs: [msg],
      memo: 'Test 1',
    });

    const txResult = await terra.tx.broadcast(tx);

    return txResult;
  }
}
