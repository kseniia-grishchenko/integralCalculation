class Function {
  constructor(coefs, integralRule = null) {
    this.coefs = coefs;
  }

  fx() {}

  calculateIntegral(integralRule) {
    const start = performance.now();
    const result = integralRule.calculate(this.fX.bind(this));
    const end = performance.now();

    return [result, (end - start).toFixed(4)];
  }
}

class ParabolicFunction extends Function {
  fX(x) {
    const {a, b, c} = this.coefs;
    return a * Math.pow(x, 2) + b * x + c;
  }
}

class SinusoidFunction extends Function {
  fX(x) {
    const {a, b, c, d} = this.coefs;
    return a * Math.sin(b * x + c) + d;
  }
}

module.exports = {ParabolicFunction, SinusoidFunction};
