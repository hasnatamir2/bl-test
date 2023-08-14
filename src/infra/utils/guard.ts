class Guard {
  static againstNullOrUndefined(argument: any, argumentName: string) {
    if (argument === null || argument === undefined || argument === '') {
      return {
        succeeded: false,
        message: `${argumentName} is required!`,
      };
    }

    return {
      succeeded: true,
      message: '',
    };
  }
  static againstNullOrUndefinedBulk(args: any[]) {
    const errors: any[] = [];
    for (let arg of args) {
      const result = this.againstNullOrUndefined(
        arg.argument,
        arg.argumentName,
      );
      if (!result.succeeded) {
        errors.push(result);
      }
    }
    return errors;
  }

  static againstRegex(
    regex: any,
    argument: any,
    argumentName: string,
    message = '',
  ) {
    if (new RegExp(regex).test(argument)) {
      return {succeeded: true, message: ''};
    }

    return {
      succeeded: false,
      message: !message
        ? `invalid ${argumentName}`
        : `${argumentName} ${message}`,
    };
  }
}

export default Guard;
