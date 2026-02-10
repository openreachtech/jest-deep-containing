export interface DeepContainingExpectMixin<R = unknown> {
  deepContaining(
    received: any,
    options?: {
      skipsArray?: boolean,
    }
  ): jasmine.ObjectContaining | jasmine.ArrayContaining | any
}

declare global {
  namespace jest {
    interface Expect extends DeepContainingExpectMixin {}
  }
}
