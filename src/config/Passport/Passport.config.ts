import passport from 'passport';

import PassportStrategy from '../../interfaces/passport.strategy.interface';

export default class PassportConfig {
    public readonly strategies: PassportStrategy[];

    constructor(strategies: PassportStrategy[]) {
        this.strategies = strategies;
        this.addStrategies();
    }

    private addStrategies(): void {
        this.strategies.forEach(pStrategy => {
            passport.use(pStrategy.name, pStrategy.strategy);
        });
    }
}
