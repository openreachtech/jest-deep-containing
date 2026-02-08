/**
 * Deep containing converter.
 */
export default class DeepContainingConverter {
  /**
   * Constructor.
   *
   * @param {DeepContainingConverterParams} params - Params of this constructor.
   */
  constructor ({
    rawExpect,
    convertsArray,
  }) {
    this.rawExpect = rawExpect
    this.convertsArray = convertsArray
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof DeepContainingConverter ? X : never} T, X
   * @param {DeepContainingConverterFactoryParams} params - Params of factory method.
   * @returns {InstanceType<T>} - Instance of DeepContainingConverter.
   * @this {T}
   */
  static create ({
    rawExpect = expect,
    convertsArray = false,
  } = {}) {
    return /** @type {InstanceType<T>} */ (
      new this({
        rawExpect,
        convertsArray,
      })
    )
  }

  /**
   * Check to return as is.
   *
   * @param {*} value - Any value.
   * @returns {boolean} - true: Returns as is.
   */
  static returnsAsIs ({
    value,
  }) {
    return value === null
      || typeof value !== 'object'
      || !this.isConvertTargetObject({
        value,
      })
  }

  /**
   * Is convert target.
   *
   * @param {{
   *   value: *
   * }} params - Parameters.
   * @returns {boolean} - true: Convert target.
   */
  static isConvertTargetObject ({
    value,
  }) {
    return value.constructor.name === 'Array'
      || value.constructor.name === 'Object'
  }

  /**
   * get: Constructor of this instance.
   *
   * @returns {typeof DeepContainingConverter} - Constructor of this instance.
   */
  get Ctor () {
    return /** @type {typeof DeepContainingConverter} */ (this.constructor)
  }

  /**
   * Convert with `expect.objectContaining()` in recursive.
   *
   * @param {{
   *   value: *
   * }} params - Parameters.
   * @returns {*} - Converted value
   * @public
   */
  deepConvert ({
    value,
  }) {
    if (this.Ctor.returnsAsIs({
      value,
    })) {
      return value
    }

    if (Array.isArray(value)) {
      const convertedValues = value.map(it =>
        this.deepConvert({ value: it })
      )

      return this.convertsArray
        ? this.rawExpect.arrayContaining(convertedValues)
        : convertedValues
    }

    return this.rawExpect.objectContaining(
      Object.fromEntries(
        this.extractKeys({
          value,
        })
          .map(key => [
            key,
            this.deepConvert({
              value: value[key],
            }),
          ])
      )
    )
  }

  /**
   * Extract keys.
   *
   * @param {{
   *   value: *
   * }} params - Parameters.
   * @returns {Array<string | symbol>} - Array of keys.
   */
  extractKeys ({
    value,
  }) {
    return [
      ...Object.keys(value),
      ...Object.getOwnPropertySymbols(value),
    ]
  }
}

/**
 * @typedef {{
 *   rawExpect: jest.Expect,
 *   convertsArray: boolean,
 * }} DeepContainingConverterParams
 */

/**
 * @typedef {{
 *   rawExpect?: jest.Expect,
 *   convertsArray?: boolean,
 * }} DeepContainingConverterFactoryParams
 */
