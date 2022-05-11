import { Controller, Get, Post } from '@nestjs/common';
import { TerraService } from './terra.service';

@Controller('terra')
export class TerraController {
  constructor(private terraService: TerraService) {}

  @Get('/')
  getBalance(): Promise<any[]> {
    return this.terraService.getBalance();
  }

  @Get('/cw20')
  getBalanceCW20(): Promise<any[]> {
    return this.terraService.getBalanceCW20();
  }

  @Get('/mint')
  getMint(): Promise<any[]> {
    return this.terraService.mintCW20();
  }

  @Get('/transfer')
  getTransfer(): Promise<any[]> {
    return this.terraService.transfer();
  }
  @Get('/transfercw20')
  getTransferCW20(): Promise<any[]> {
    return this.terraService.transferCW20();
  }
}
