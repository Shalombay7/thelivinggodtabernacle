import { Injectable } from '@nestjs/common';
import { scaffoldManifest } from './scaffold.manifest';

@Injectable()
export class ScaffoldService {
  getManifest() {
    return {
      generatedAt: new Date().toISOString(),
      ...scaffoldManifest,
    };
  }
}
