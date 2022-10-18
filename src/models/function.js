// const {MidpointRule, TrapezoidRule, SimpsonRule} = require('./integralRule.js');

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

// const parabolic_instance = new ParabolicFunction({
//   a: 1,
//   b: 0,
//   c: 0,
// });

// parabolic_instance.chooseIntegralRule(
//   new MidpointRule(
//     {
//       start: 0,
//       end: 1,
//     },
//     4,
//   ),
// );

// const result1 = parabolic_instance.calculateIntegral();
// console.log(result1);

// parabolic_instance.chooseIntegralRule(
//   new TrapezoidRule(
//     {
//       start: 0,
//       end: 1,
//     },
//     4,
//   ),
// );

// const result2 = parabolic_instance.calculateIntegral();
// console.log(result2);

// parabolic_instance.chooseIntegralRule(
//   new SimpsonRule(
//     {
//       start: 0,
//       end: 1,
//     },
//     4,
//   ),
// );

// const result3 = parabolic_instance.calculateIntegral();
// console.log(result3);

// const sinusoid_instance = new SinusoidFunction({
//   a: 2,
//   b: 1,
//   c: 0,
//   d: 0,
// });

// sinusoid_instance.chooseIntegralRule(
//   new MidpointRule(
//     {
//       start: 0,
//       end: 4,
//     },
//     5,
//   ),
// );

// const result4 = sinusoid_instance.calculateIntegral();
// console.log(result4);

// sinusoid_instance.chooseIntegralRule(
//   new TrapezoidRule(
//     {
//       start: 0,
//       end: 4,
//     },
//     5,
//   ),
// );

// const result5 = sinusoid_instance.calculateIntegral();
// console.log(result5);

// sinusoid_instance.chooseIntegralRule(
//   new SimpsonRule(
//     {
//       start: 0,
//       end: 4,
//     },
//     5,
//   ),
// );

// const result6 = sinusoid_instance.calculateIntegral();
// console.log(result6);

module.exports = {ParabolicFunction, SinusoidFunction};
