import passport from 'passport';

import PassportStrategy from '../../interfaces/passport.strategy.interface';
import { logger } from '../../utils/logger';

export default class PassportConfig {
    public readonly strategies: PassportStrategy[];

    constructor(strategies: PassportStrategy[]) {
        this.strategies = strategies;
        this.addStrategies();
    }

    private addStrategies(): void {
        this.strategies.forEach((pStrategy: PassportStrategy) => {
            passport.use(pStrategy.name, pStrategy.strategy);
        });
    }
}
