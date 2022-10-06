const {MidpointRule, TrapezoidRule, SimpsonRule} = require('./integralRule.js');

class Function {
  constructor(coefs, integralRule = null) {
    this.coefs = coefs;
    this.integralRule = integralRule;
  }

  chooseIntegralRule(rule) {
    this.integralRule = rule;
  }

  fx() {}

  calculateIntegral() {
    return this.integralRule.calculate(this.fX.bind(this));
  }
}

class ParabolicFunction extends Function {
  fX(x) {
    const {a, b, c} = this.coefs;
    return a * Math.pow(x, 2) + b * x + c;
  }
}

class SinusoidFunction extends Function {
  constructor(coefs, integralRule) {
    super(coefs, integralRule);
  }
}

const test_instance = new ParabolicFunction({
  a: 1,
  b: 0,
  c: 0,
});

test_instance.chooseIntegralRule(
  new MidpointRule(
    {
      start: 0,
      end: 1,
    },
    4,
  ),
);

const result1 = test_instance.calculateIntegral();
console.log(result1);

test_instance.chooseIntegralRule(
  new TrapezoidRule(
    {
      start: 0,
      end: 1,
    },
    4,
  ),
);

const result2 = test_instance.calculateIntegral();
console.log(result2);

test_instance.chooseIntegralRule(
  new SimpsonRule(
    {
      start: 0,
      end: 1,
    },
    4,
  ),
);

const result3 = test_instance.calculateIntegral();
console.log(result3);
