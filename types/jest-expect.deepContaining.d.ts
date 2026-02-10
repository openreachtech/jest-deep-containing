export interface DeepContainingExpectMixin<R = unknown> {
  deepContaining(
    received: any,
    options?: {
      convertsArray?: boolean,
    }
  ): jasmine.ObjectContaining | jasmine.ArrayContaining | any
}

declare global {
  namespace jest {
    interface Expect extends DeepContainingExpectMixin {}
  }
}
