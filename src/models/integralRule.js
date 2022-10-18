class IntegralRule {
  constructor(interval, stepsCount) {
    this.interval = interval;
    this.stepsCount = stepsCount;

    this.delta = this.calculateStep();
  }

  calculateStep() {
    const {start, end} = this.interval;

    return (end - start) / this.stepsCount;
  }

  calculateIntervalPoints() {}

  calculate() {}
}

class MidpointRule extends IntegralRule {
  calculateIntervalPoints() {
    const midPoints = [];
    const {start, end} = this.interval;

    for (let i = start; i + this.delta <= end; i += this.delta) {
      const curStart = i;
      const curEnd = i + this.delta;
      midPoints.push((curEnd + curStart) / 2);
    }

    return midPoints;
  }

  calculate(func) {
    const midPoints = this.calculateIntervalPoints();
    return midPoints
      .reduce((sum, currentPoint) => {
        return sum + this.delta * func(currentPoint);
      }, 0)
      .toFixed(4);
  }
}

class TrapezoidRule extends IntegralRule {
  calculateIntervalPoints() {
    const intervalPoints = [];
    const {start, end} = this.interval;

    for (let i = start; i <= end; i += this.delta) {
      intervalPoints.push(i);
    }

    return intervalPoints;
  }

  calculate(fX) {
    const intervalPoints = this.calculateIntervalPoints();
    const lastIndex = intervalPoints.length - 1;
    return intervalPoints
      .reduce((sum, currentPoint, index) => {
        let funcExpr = 2 * fX(currentPoint);
        if (index === 0 || index === lastIndex) {
          funcExpr = fX(currentPoint);
        }
        return sum + 0.5 * this.delta * funcExpr;
      }, 0)
      .toFixed(4);
  }
}

class SimpsonRule extends IntegralRule {
  calculateIntervalPoints() {
    const intervalPoints = [];
    const {start, end} = this.interval;

    for (let i = start; i <= end; i += this.delta) {
      intervalPoints.push(i);
    }

    return intervalPoints;
  }

  calculate(fX) {
    const intervalPoints = this.calculateIntervalPoints();
    const lastIndex = intervalPoints.length - 1;
    return intervalPoints
      .reduce((sum, currentPoint, index) => {
        let funcExpr = 2 * fX(currentPoint);
        if (index === 0 || index === lastIndex) {
          funcExpr = fX(currentPoint);
        } else if (index % 2 !== 0) {
          funcExpr = 4 * fX(currentPoint);
        }
        return sum + (this.delta / 3) * funcExpr;
      }, 0)
      .toFixed(4);
  }
}

module.exports = {MidpointRule, TrapezoidRule, SimpsonRule};
