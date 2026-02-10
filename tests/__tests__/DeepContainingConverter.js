import DeepContainingConverter from '../../lib/DeepContainingConverter.js'

describe('DeepContainingConverter', () => {
  describe('constructor', () => {
    describe('to keep parameter', () => {
      describe('#rawExpect', () => {
        /** @type {typeof expect} */
        const mockExpect = /** @type {*} */ ({
          tally: Symbol('tally'),
        })

        const cases = [
          {
            name: 'actual expect',
            input: {
              rawExpect: expect,
              skipsArray: false,
            },
          },
          {
            name: 'mock expect',
            input: {
              rawExpect: mockExpect,
              skipsArray: true,
            },
          },
        ]

        test.each(cases)('$name', ({ input }) => {
          const converter = new DeepContainingConverter(input)

          expect(converter)
            .toHaveProperty('rawExpect', input.rawExpect)
        })
      })

      describe('#skipsArray', () => {
        const cases = [
          {
            input: {
              rawExpect: expect,
              skipsArray: false,
            },
          },
          {
            input: {
              rawExpect: expect,
              skipsArray: true,
            },
          },
        ]

        test.each(cases)('skipsArray: $input.skipsArray', ({ input }) => {
          const converter = new DeepContainingConverter(input)

          expect(converter)
            .toHaveProperty('skipsArray', input.skipsArray)
        })
      })
    })
  })
})

describe('DeepContainingConverter', () => {
  describe('.create()', () => {
    /** @type {typeof expect} */
    const mockExpect = /** @type {*} */ ({
      tally: Symbol('tally'),
    })

    describe('to be instance of own class', () => {
      describe('with full arguments', () => {
        const cases = [
          {
            name: 'actual expect',
            input: {
              rawExpect: expect,
              skipsArray: true,
            },
          },
          {
            name: 'mock expect',
            input: {
              rawExpect: mockExpect,
              skipsArray: false,
            },
          },
        ]

        test.each(cases)('$name', ({ input }) => {
          const converter = DeepContainingConverter.create(input)

          expect(converter)
            .toBeInstanceOf(DeepContainingConverter)
        })
      })

      describe('with lacked arguments', () => {
        const cases = [
          {
            name: 'without skipsArray',
            input: {
              rawExpect: expect,
              // skipsArray: false,
            },
          },
          {
            name: 'without expect',
            input: {
              // rawExpect: expect,
              skipsArray: false,
            },
          },
          {
            name: 'without any arguments',
            input: {
              // rawExpect: expect,
              // skipsArray: false,
            },
          },
        ]

        test.each(cases)('$name', ({ input }) => {
          const converter = DeepContainingConverter.create(input)

          expect(converter)
            .toBeInstanceOf(DeepContainingConverter)
        })
      })
    })

    describe('to call constructor', () => {
      describe('with full arguments', () => {
        const cases = [
          {
            name: 'actual expect',
            input: {
              rawExpect: expect,
              skipsArray: true,
            },
            expected: {
              rawExpect: expect,
              skipsArray: true,
            },
          },
          {
            name: 'mock expect',
            input: {
              rawExpect: mockExpect,
              skipsArray: false,
            },
            expected: {
              rawExpect: mockExpect,
              skipsArray: false,
            },
          },
        ]

        test.each(cases)('$name', ({ input, expected }) => {
          const SpyClass = globalThis.constructorSpy.spyOn(DeepContainingConverter)

          SpyClass.create(input)

          expect(SpyClass.__spy__)
            .toHaveBeenCalledWith(expected)
        })
      })

      describe('with lacked arguments', () => {
        const cases = [
          {
            name: 'without skipsArray',
            input: {
              rawExpect: expect,
              // skipsArray: false,
            },
            expected: {
              rawExpect: expect,
              skipsArray: false,
            },
          },
          {
            name: 'without rawExpect',
            input: {
              // rawExpect: expect,
              skipsArray: true,
            },
            expected: {
              rawExpect: expect,
              skipsArray: true,
            },
          },
          {
            name: 'without any arguments',
            input: {
              // rawExpect: expect,
              // skipsArray: false,
            },
            expected: {
              rawExpect: expect,
              skipsArray: false,
            },
          },
        ]

        test.each(cases)('$name', ({ input, expected }) => {
          const SpyClass = globalThis.constructorSpy.spyOn(DeepContainingConverter)

          SpyClass.create(input)

          expect(SpyClass.__spy__)
            .toHaveBeenCalledWith(expected)
        })
      })
    })
  })
})

describe('DeepContainingConverter', () => {
  describe('.returnsAsIs()', () => {
    describe('should be truthy', () => {
      const cases = [
        { input: { value: 'string' } },
        { input: { value: 111 } },
        { input: { value: 222.33 } },
        { input: { value: null } },
        { input: { value: new Date('2022-04-24T11:22:33.000Z') } },
        { input: { value: Error('truthy') } },
        { input: { value: /none/u } },
        { input: { value: Boolean(true) } },
        { input: { value: Number(-1000) } },
        { input: { value: String('tally') } },
      ]

      test.each(cases)('value: $input.value', ({ input }) => {
        const received = DeepContainingConverter.returnsAsIs(input)

        expect(received)
          .toBeTruthy()
      })
    })

    describe('should be falsy', () => {
      const cases = [
        {
          input: {
            value: {
              aaa: 1,
              bbb: 2,
            },
          },
        },
        {
          input: {
            value: [
              1,
              3,
              5,
            ],
          },
        },
      ]

      test.each(cases)('value: $input.value', ({ input }) => {
        const received = DeepContainingConverter.returnsAsIs(input)

        expect(received)
          .toBeFalsy()
      })
    })
  })
})

describe('DeepContainingConverter', () => {
  describe('.isConvertTargetObject()', () => {
    describe('should be truthy', () => {
      const cases = [
        { input: { value: {} } },
        { input: { value: [] } },
      ]

      test.each(cases)('value: $input.value', ({ input }) => {
        const received = DeepContainingConverter.isConvertTargetObject(input)

        expect(received)
          .toBeTruthy()
      })
    })

    describe('should be falsy', () => {
      const cases = [
        { input: { value: new Date() } },
        { input: { value: new Error('falsy') } },
        { input: { value: /none/u } },
        { input: { value: Boolean(false) } },
        { input: { value: Number(1000) } },
        { input: { value: String('tally') } },
      ]

      test.each(cases)('value: $input.value', ({ input }) => {
        const received = DeepContainingConverter.isConvertTargetObject(input)

        expect(received)
          .toBeFalsy()
      })
    })
  })
})

describe('DeepContainingConverter', () => {
  describe('#get:Ctor', () => {
    const cases = [
      {
        input: {
          rawExpect: expect,
          skipsArray: false,
        },
      },
      {
        input: {
          rawExpect: expect,
          skipsArray: true,
        },
      },
    ]

    test.each(cases)('skipsArray: $input.skipsArray', ({ input }) => {
      const converter = new DeepContainingConverter(input)

      const received = converter.Ctor

      expect(received)
        .toBe(DeepContainingConverter) // same reference
    })
  })
})

describe('DeepContainingConverter', () => {
  describe('#deepConvert()', () => {
    describe('primitive value', () => {
      const cases = [
        { input: { value: Symbol('symbol') } },
        { input: { value: true } },
        { input: { value: false } },
        { input: { value: NaN } },
        { input: { value: 100 } },
        { input: { value: 10000n } },
        { input: { value: 999.123 } },
        { input: { value: 'string' } },
      ]

      test.each(cases)('value: $input.value', ({ input }) => {
        const converter = DeepContainingConverter.create()

        const received = converter.deepConvert(input)

        expect(received)
          .toBe(input.value) // same reference
      })
    })

    describe('undefined value', () => {
      test('undefined', () => {
        const converter = DeepContainingConverter.create()

        expect(converter.deepConvert({
          value: undefined,
        }))
          .toBeUndefined()
      })
    })

    describe('null value', () => {
      test('null', () => {
        const converter = DeepContainingConverter.create()

        expect(converter.deepConvert({
          value: null,
        }))
          .toBeNull()
      })
    })
  })
})

describe('DeepContainingConverter', () => {
  describe('#deepConvert()', () => {
    describe('should call expect.objectContaining()', () => {
      describe('call zero times', () => {
        const cases = [
          { input: { value: Symbol('symbol') } },
          { input: { value: true } },
          { input: { value: false } },
          { input: { value: NaN } },
          { input: { value: 100 } },
          { input: { value: 10000n } },
          { input: { value: 999.123 } },
          { input: { value: 'string' } },
          { input: { value: undefined } },
          { input: { value: null } },
        ]

        test.each(cases)('value: $input.value', ({ input }) => {
          const objectContainingSpy = jest.spyOn(expect, 'objectContaining')
          const converter = DeepContainingConverter.create({
            rawExpect: expect,
          })

          converter.deepConvert(input)

          expect(objectContainingSpy)
            .toHaveBeenCalledTimes(0)
        })
      })

      describe('call once', () => {
        const cases = [
          {
            input: {
              value: {},
            },
          },
          {
            input: {
              value: {
                first: 111,
              },
            },
          },
          {
            input: {
              value: {
                first: 111,
                second: '222',
              },
            },
          },
          {
            input: {
              value: {
                first: 111,
                array: [],
              },
            },
          },
          {
            input: {
              value: {
                first: 111,
                array: [
                  'one',
                  'two',
                ],
              },
            },
          },
        ]

        test.each(cases)('value: $input.value', ({ input }) => {
          const objectContainingSpy = jest.spyOn(expect, 'objectContaining')
          const converter = DeepContainingConverter.create({
            rawExpect: expect,
          })

          converter.deepConvert(input)

          expect(objectContainingSpy)
            .toHaveBeenCalledTimes(1)
          expect(objectContainingSpy)
            .toHaveBeenCalledWith(input.value)
        })
      })

      describe('call twice', () => {
        const cases = [
          {
            input: {
              value: {
                first: 111,
                second: '222',
                child: {
                  third: 333,
                  fourth: '444',
                },
              },
            },
            expectedWith: [
              {
                nth: 1,
                with: {
                  third: 333,
                  fourth: '444',
                },
              },
              {
                nth: 2,
                with: {
                  first: 111,
                  second: '222',
                  child: {
                    third: 333,
                    fourth: '444',
                  },
                },
              },
            ],
          },
          {
            input: {
              value: {
                first: 111,
                second: '222',
                array: [
                  {
                    third: 333,
                    fourth: '444',
                  },
                ],
              },
            },
            expectedWith: [
              {
                nth: 1,
                with: {
                  third: 333,
                  fourth: '444',
                },
              },
              {
                nth: 2,
                with: {
                  first: 111,
                  second: '222',
                  array: [
                    {
                      third: 333,
                      fourth: '444',
                    },
                  ],
                },
              },
            ],
          },
          {
            input: {
              value: [
                {
                  first: 111,
                  second: '222',
                },
                {
                  third: 333,
                  fourth: '444',
                },
              ],
            },
            expectedWith: [
              {
                nth: 1,
                with: {
                  first: 111,
                  second: '222',
                },
              },
              {
                nth: 2,
                with: {
                  third: 333,
                  fourth: '444',
                },
              },
            ],
          },
        ]

        test.each(cases)('value: $input.value', ({ input, expectedWith }) => {
          const objectContainingSpy = jest.spyOn(expect, 'objectContaining')
          const converter = DeepContainingConverter.create()

          converter.deepConvert(input)

          expect(objectContainingSpy)
            .toHaveBeenCalledTimes(2)
          expect(objectContainingSpy)
            .toHaveBeenNthCalledWith(
              expectedWith[0].nth,
              expectedWith[0].with
            )
          expect(objectContainingSpy)
            .toHaveBeenNthCalledWith(
              expectedWith[1].nth,
              expectedWith[1].with
            )
        })
      })

      describe('call thrice', () => {
        const cases = [
          {
            input: {
              value: {
                first: 111,
                child: {
                  second: '222',
                  grandchild: {
                    third: 333,
                  },
                },
              },
            },
            expectedWith: [
              {
                nth: 1,
                with: {
                  third: 333,
                },
              },
              {
                nth: 2,
                with: {
                  second: '222',
                  grandchild: {
                    third: 333,
                  },
                },
              },
              {
                nth: 3,
                with: {
                  first: 111,
                  child: {
                    second: '222',
                    grandchild: {
                      third: 333,
                    },
                  },
                },
              },
            ],
          },
          {
            input: {
              value: {
                first: 111,
                array: [
                  { second: '222' },
                  { third: 333 },
                ],
              },
            },
            expectedWith: [
              {
                nth: 1,
                with: {
                  second: '222',
                },
              },
              {
                nth: 2,
                with: {
                  third: 333,
                },
              },
              {
                nth: 3,
                with: {
                  first: 111,
                  array: [
                    { second: '222' },
                    { third: 333 },
                  ],
                },
              },
            ],
          },
          {
            input: {
              value: [
                { first: 111 },
                { second: '222' },
                { third: 333 },
              ],
            },
            expectedWith: [
              {
                nth: 1,
                with: {
                  first: 111,
                },
              },
              {
                nth: 2,
                with: {
                  second: '222',
                },
              },
              {
                nth: 3,
                with: {
                  third: 333,
                },
              },
            ],
          },
        ]

        test.each(cases)('input: $input.value', ({ input, expectedWith }) => {
          const objectContainingSpy = jest.spyOn(expect, 'objectContaining')
          const converter = DeepContainingConverter.create()

          converter.deepConvert(input)

          expect(objectContainingSpy)
            .toHaveBeenCalledTimes(3)
          expect(objectContainingSpy)
            .toHaveBeenNthCalledWith(
              expectedWith[0].nth,
              expectedWith[0].with
            )
          expect(objectContainingSpy)
            .toHaveBeenNthCalledWith(
              expectedWith[1].nth,
              expectedWith[1].with
            )
          expect(objectContainingSpy)
            .toHaveBeenNthCalledWith(
              expectedWith[2].nth,
              expectedWith[2].with
            )
        })
      })
    })

    describe('apply converted value to expect.toEqual()', () => {
      describe('single layer', () => {
        describe('valid cases', () => {
          /**
           * @type {Array<{
           *   input: {
           *     value: object
           *   }
           *   equalTargetCases: Array<{
           *     equalTarget: object
           *   }>
           * }>}
           */
          const cases = [
            {
              input: {
                value: {},
              },
              equalTargetCases: [
                {
                  equalTarget: {},
                },
                {
                  equalTarget: {
                    first: 111,
                    second: '222',
                  },
                },
                {
                  equalTarget: {
                    third: 333,
                    fourth: '444',
                  },
                },
              ],
            },
            {
              input: {
                value: {
                  first: 111,
                  second: '222',
                },
              },
              equalTargetCases: [
                {
                  equalTarget: {
                    first: 111,
                    second: '222',
                  },
                },
                {
                  equalTarget: {
                    first: 111,
                    second: '222',
                    third: 333,
                  },
                },
                {
                  equalTarget: {
                    first: 111,
                    second: '222',
                    child: {
                      third: 333,
                      fourth: '444',
                    },
                  },
                },
                {
                  equalTarget: {
                    first: 111,
                    second: '222',
                    array: [
                      { third: 333 },
                      { fourth: '444' },
                    ],
                  },
                },
              ],
            },
          ]

          describe.each(cases)('value: $input.value', ({ input, equalTargetCases }) => {
            const converter = DeepContainingConverter.create()

            test.each(equalTargetCases)('$equalTarget', ({ equalTarget }) => {
              const received = converter.deepConvert(input)

              expect(equalTarget)
                .toEqual(received) // ✅️
            })
          })
        })

        describe('invalid cases', () => {
          /**
           * @type {Array<{
           *   input: {
           *     value: object
           *   }
           *   equalTargetCases: Array<{
           *     equalTarget: object
           *   }>
           * }>}
           */
          const cases = [
            {
              input: {
                value: {
                  first: 111,
                  second: '222',
                },
              },
              equalTargetCases: [
                {
                  equalTarget: {
                    // first: 111,
                    // second: '222',
                  },
                },
                {
                  equalTarget: {
                    // first: 111,
                    second: '222',
                  },
                },
                {
                  equalTarget: {
                    first: 111,
                    // second: '222',
                  },
                },
                {
                  equalTarget: {
                    // first: 111,
                    second: '222',
                    third: 333,
                  },
                },
                {
                  equalTarget: {
                    first: 111,
                    // second: '222',
                    third: 333,
                  },
                },
              ],
            },
          ]

          describe.each(cases)('value: $input.value', ({ input, equalTargetCases }) => {
            const converter = DeepContainingConverter.create()

            test.each(equalTargetCases)('$equalTarget', ({ equalTarget }) => {
              expect(equalTarget)
                .not.toEqual(
                  converter.deepConvert(input)
                )
            })
          })
        })
      })

      describe('double layer', () => {
        describe('valid cases', () => {
          /**
           * @type {Array<{
           *   input: {
           *     value: object
           *   }
           *   equalTargetCases: Array<{
           *     equalTarget: object
           *   }>
           * }>}
           */
          const cases = [
            {
              input: {
                value: {
                  first: 111,
                  second: '222',
                  child: {
                    third: 333,
                    fourth: '444',
                  },
                },
              },
              equalTargetCases: [
                {
                  equalTarget: {
                    first: 111,
                    second: '222',
                    child: {
                      third: 333,
                      fourth: '444',
                    },
                  },
                },
                {
                  equalTarget: {
                    first: 111,
                    second: '222',
                    child: {
                      third: 333,
                      fourth: '444',
                    },
                    fifth: 555,
                  },
                },
                {
                  equalTarget: {
                    first: 111,
                    second: '222',
                    child: {
                      third: 333,
                      fourth: '444',
                      fifth: 555,
                    },
                  },
                },
                {
                  equalTarget: {
                    first: 111,
                    second: '222',
                    child: {
                      third: 333,
                      fourth: '444',
                      sixth: '666',
                    },
                    fifth: 555,
                  },
                },
              ],
            },
          ]

          describe.each(cases)('value: $input.value', ({ input, equalTargetCases }) => {
            const converter = DeepContainingConverter.create()

            test.each(equalTargetCases)('$equalTarget', ({ equalTarget }) => {
              expect(equalTarget)
                .toEqual(
                  converter.deepConvert(input)
                )
            })
          })
        })

        describe('invalid cases', () => {
          /**
           * @type {Array<{
           *   input: {
           *     value: object
           *   }
           *   equalTargetCases: Array<{
           *     equalTarget: object
           *   }>
           * }>}
           */
          const cases = [
            {
              input: {
                value: {
                  first: 111,
                  second: '222',
                  child: {
                    third: 333,
                    fourth: '444',
                  },
                },
              },
              equalTargetCases: [
                {
                  equalTarget: {
                    // first: 111,
                    second: '222',
                    child: {
                      third: 333,
                      fourth: '444',
                    },
                  },
                },
                {
                  equalTarget: {
                    first: 111,
                    // second: '222',
                    child: {
                      third: 333,
                      fourth: '444',
                    },
                  },
                },
                {
                  equalTarget: {
                    first: 111,
                    second: '222',
                    child: {
                      // third: 333,
                      fourth: '444',
                    },
                  },
                },
                {
                  equalTarget: {
                    first: 111,
                    second: '222',
                    child: {
                      third: 333,
                      // fourth: '444',
                    },
                  },
                },
              ],
            },
          ]

          describe.each(cases)('value: $input.value', ({ input, equalTargetCases }) => {
            const converter = DeepContainingConverter.create()

            test.each(equalTargetCases)('$equalTarget', ({ equalTarget }) => {
              expect(equalTarget)
                .not.toEqual(
                  converter.deepConvert(input)
                )
            })
          })
        })
      })

      describe('triple layer', () => {
        describe('valid cases', () => {
          /**
           * @type {Array<{
           *   input: {
           *     value: object
           *   }
           *   equalTargetCases: Array<{
           *     equalTarget: object
           *   }>
           * }>}
           */
          const cases = [
            {
              input: {
                value: {
                  first: 111,
                  second: '222',
                  child: {
                    third: 333,
                    fourth: '444',
                    grandchild: {
                      fifth: 555,
                      sixth: '666',
                    },
                  },
                },
              },
              equalTargetCases: [
                // no more
                {
                  equalTarget: {
                    first: 111,
                    second: '222',
                    child: {
                      third: 333,
                      fourth: '444',
                      grandchild: {
                        fifth: 555,
                        sixth: '666',
                      },
                    },
                  },
                },
                // once more
                {
                  equalTarget: {
                    first: 111,
                    second: '222',
                    child: {
                      third: 333,
                      fourth: '444',
                      grandchild: {
                        fifth: 555,
                        sixth: '666',
                      },
                    },
                    seventh: 777,
                  },
                },
                {
                  equalTarget: {
                    first: 111,
                    second: '222',
                    child: {
                      third: 333,
                      fourth: '444',
                      grandchild: {
                        fifth: 555,
                        sixth: '666',
                      },
                      seventh: 777,
                    },
                  },
                },
                {
                  equalTarget: {
                    first: 111,
                    second: '222',
                    child: {
                      third: 333,
                      fourth: '444',
                      grandchild: {
                        fifth: 555,
                        sixth: '666',
                        seventh: 777,
                      },
                    },
                  },
                },
                // twice more
                {
                  equalTarget: {
                    first: 111,
                    second: '222',
                    child: {
                      third: 333,
                      fourth: '444',
                      grandchild: {
                        fifth: 555,
                        sixth: '666',
                      },
                      eighth: '888',
                    },
                    seventh: 777,
                  },
                },
                {
                  equalTarget: {
                    first: 111,
                    second: '222',
                    child: {
                      third: 333,
                      fourth: '444',
                      grandchild: {
                        fifth: 555,
                        sixth: '666',
                        eighth: '888',
                      },
                    },
                    seventh: 777,
                  },
                },
                {
                  equalTarget: {
                    first: 111,
                    second: '222',
                    child: {
                      third: 333,
                      fourth: '444',
                      grandchild: {
                        fifth: 555,
                        sixth: '666',
                        eighth: '888',
                      },
                      seventh: 777,
                    },
                  },
                },
                // thrice more
                {
                  equalTarget: {
                    first: 111,
                    second: '222',
                    child: {
                      third: 333,
                      fourth: '444',
                      grandchild: {
                        fifth: 555,
                        sixth: '666',
                        ninth: 999,
                      },
                      eighth: '888',
                    },
                    seventh: 777,
                  },
                },
              ],
            },
          ]

          describe.each(cases)('$input', ({ input, equalTargetCases }) => {
            const converter = DeepContainingConverter.create()

            test.each(equalTargetCases)('$equalTarget', ({ equalTarget }) => {
              expect(equalTarget)
                .toEqual(
                  converter.deepConvert(input)
                )
            })
          })
        })

        describe('invalid cases', () => {
          /**
           * @type {Array<{
           *   input: {
           *     value: object
           *   }
           *   equalTargetCases: Array<{
           *     equalTarget: object
           *   }>
           * }>}
           */
          const cases = [
            {
              input: {
                value: {
                  first: 111,
                  second: '222',
                  child: {
                    third: 333,
                    fourth: '444',
                    grandchild: {
                      fifth: 555,
                      sixth: '666',
                    },
                  },
                },
              },
              equalTargetCases: [
                {
                  equalTarget: {
                    // first: 111,
                    second: '222',
                    child: {
                      third: 333,
                      fourth: '444',
                      grandchild: {
                        fifth: 555,
                        sixth: '666',
                      },
                    },
                  },
                },
                {
                  equalTarget: {
                    first: 111,
                    second: '222',
                    child: {
                      // third: 333,
                      fourth: '444',
                      grandchild: {
                        fifth: 555,
                        sixth: '666',
                      },
                    },
                  },
                },
                {
                  equalTarget: {
                    first: 111,
                    second: '222',
                    child: {
                      third: 333,
                      fourth: '444',
                      grandchild: {
                        // fifth: 555,
                        sixth: '666',
                      },
                    },
                  },
                },
              ],
            },
          ]

          describe.each(cases)('value: $input.value', ({ input, equalTargetCases }) => {
            const converter = DeepContainingConverter.create()

            test.each(equalTargetCases)('$equalTarget', ({ equalTarget }) => {
              expect(equalTarget)
                .not.toEqual(
                  converter.deepConvert(input)
                )
            })
          })
        })
      })
    })
  })
})

describe('DeepContainingConverter', () => {
  describe('#deepConvert()', () => {
    describe('call expect.arrayContaining()', () => {
      describe('call zero times', () => {
        const cases = [
          { input: { value: Symbol('symbol') } },
          { input: { value: true } },
          { input: { value: false } },
          { input: { value: NaN } },
          { input: { value: 100 } },
          { input: { value: 10000n } },
          { input: { value: 999.123 } },
          { input: { value: 'string' } },
          { input: { value: undefined } },
          { input: { value: null } },
        ]

        test.each(cases)('value: $input.value', ({ input }) => {
          const arrayContainingSpy = jest.spyOn(expect, 'arrayContaining')
          const converter = DeepContainingConverter.create({
            rawExpect: expect,
            skipsArray: true, // ✅️
          })

          converter.deepConvert(input)

          expect(arrayContainingSpy)
            .toHaveBeenCalledTimes(0)
        })
      })

      describe('call once', () => {
        const cases = [
          {
            input: {
              value: [],
            },
            expected: [],
          },
          {
            input: {
              value: [
                111,
              ],
            },
            expected: [
              111,
            ],
          },
          {
            input: {
              value: [
                {
                  first: 111,
                  second: '222',
                },
              ],
            },
            expected: [
              {
                first: 111,
                second: '222',
              },
            ],
          },
          {
            input: {
              value: {
                first: 111,
                array: [],
              },
            },
            expected: [],
          },
          {
            input: {
              value: {
                first: 111,
                array: [
                  'one',
                  'two',
                ],
              },
            },
            expected: [
              'one',
              'two',
            ],
          },
        ]

        describe('on skipsArray: true', () => {
          test.each(cases)('$input.value', ({ input, expected }) => {
            const arrayContainingSpy = jest.spyOn(expect, 'arrayContaining')
            const converter = DeepContainingConverter.create({
              rawExpect: expect,
              skipsArray: true, // ✅️
            })

            converter.deepConvert(input)

            expect(arrayContainingSpy)
              .toHaveBeenCalledTimes(1)
            expect(arrayContainingSpy)
              .toHaveBeenCalledWith(expected)
          })
        })

        describe('on skipsArray: false', () => {
          test.each(cases)('$input.value', ({ input, expected }) => {
            const arrayContainingSpy = jest.spyOn(expect, 'arrayContaining')
            const converter = DeepContainingConverter.create({
              rawExpect: expect,
              skipsArray: false, // ✅️
            })

            converter.deepConvert(input)

            expect(arrayContainingSpy)
              .toHaveBeenCalledTimes(0)
          })
        })
      })

      describe('call twice', () => {
        const cases = [
          {
            input: {
              value: [
                111,
                '222',
                [
                  333,
                  '444',
                ],
              ],
            },
            expectedWith: [
              {
                nth: 1,
                with: [
                  333,
                  '444',
                ],
              },
              {
                nth: 2,
                with: [
                  111,
                  '222',
                  [
                    333,
                    '444',
                  ],
                ],
              },
            ],
          },
          {
            input: {
              value: [
                [
                  111,
                  '222',
                ],
              ],
            },
            expectedWith: [
              {
                nth: 1,
                with: [
                  111,
                  '222',
                ],
              },
              {
                nth: 2,
                with: [
                  [
                    111,
                    '222',
                  ],
                ],
              },
            ],
          },
        ]

        describe('on skipsArray: true', () => {
          test.each(cases)('value: $input.value', ({ input, expectedWith }) => {
            const arrayContainingSpy = jest.spyOn(expect, 'arrayContaining')
            const converter = DeepContainingConverter.create({
              rawExpect: expect,
              skipsArray: true, // ✅️
            })

            converter.deepConvert(input)

            expect(arrayContainingSpy)
              .toHaveBeenCalledTimes(2)
            expect(arrayContainingSpy)
              .toHaveBeenNthCalledWith(
                expectedWith[0].nth,
                expectedWith[0].with
              )
            expect(arrayContainingSpy)
              .toHaveBeenNthCalledWith(
                expectedWith[1].nth,
                expectedWith[1].with
              )
          })
        })

        describe('on skipsArray: false', () => {
          test.each(cases)('value: $input.value', ({ input, expectedWith }) => {
            const arrayContainingSpy = jest.spyOn(expect, 'arrayContaining')
            const converter = DeepContainingConverter.create({
              rawExpect: expect,
              skipsArray: false, // ✅️
            })

            converter.deepConvert(input)

            expect(arrayContainingSpy)
              .toHaveBeenCalledTimes(0)
          })
        })
      })

      describe('call thrice', () => {
        const cases = [
          {
            input: {
              value: [
                111,
                [
                  '222',
                  [
                    333,
                  ],
                ],
              ],
            },
            expectedWith: [
              {
                nth: 1,
                with: [
                  333,
                ],
              },
              {
                nth: 2,
                with: [
                  '222',
                  [
                    333,
                  ],
                ],
              },
              {
                nth: 3,
                with: [
                  111,
                  [
                    '222',
                    [
                      333,
                    ],
                  ],
                ],
              },
            ],
          },
          {
            input: {
              value: [
                111,
                ['222'],
                [333],
              ],
            },
            expectedWith: [
              {
                nth: 1,
                with: ['222'],
              },
              {
                nth: 2,
                with: [333],
              },
              {
                nth: 3,
                with: [
                  111,
                  ['222'],
                  [333],
                ],
              },
            ],
          },
          {
            input: {
              value: {
                first: [111],
                second: ['222'],
                third: [333],
              },
            },
            expectedWith: [
              {
                nth: 1,
                with: [111],
              },
              {
                nth: 2,
                with: ['222'],
              },
              {
                nth: 3,
                with: [333],
              },
            ],
          },
        ]

        describe('on skipsArray: true', () => {
          test.each(cases)('value: $input.value', ({ input, expectedWith }) => {
            const arrayContainingSpy = jest.spyOn(expect, 'arrayContaining')
            const converter = DeepContainingConverter.create({
              rawExpect: expect,
              skipsArray: true, // ✅️
            })

            converter.deepConvert(input)

            expect(arrayContainingSpy)
              .toHaveBeenCalledTimes(3)
            expect(arrayContainingSpy)
              .toHaveBeenNthCalledWith(
                expectedWith[0].nth,
                expectedWith[0].with
              )
            expect(arrayContainingSpy)
              .toHaveBeenNthCalledWith(
                expectedWith[1].nth,
                expectedWith[1].with
              )
            expect(arrayContainingSpy)
              .toHaveBeenNthCalledWith(
                expectedWith[2].nth,
                expectedWith[2].with
              )
          })
        })

        describe('on skipsArray: false', () => {
          test.each(cases)('value: $input.value', ({ input, expectedWith }) => {
            const arrayContainingSpy = jest.spyOn(expect, 'arrayContaining')
            const converter = DeepContainingConverter.create({
              rawExpect: expect,
              skipsArray: false, // ✅️
            })

            converter.deepConvert(input)

            expect(arrayContainingSpy)
              .toHaveBeenCalledTimes(0)
          })
        })
      })
    })
  })
})

describe('DeepContainingConverter', () => {
  describe('#extractKeys()', () => {
    const converter = DeepContainingConverter.create()

    describe('string keys only', () => {
      const cases = [
        {
          input: {
            value: {},
          },
          expectedKeys: [],
        },
        {
          input: {
            value: {
              aaa: 1,
              bbb: 2,
            },
          },
          expectedKeys: ['aaa', 'bbb'],
        },
      ]

      test.each(cases)('value: $input.value', ({ input, expectedKeys }) => {
        const received = converter.extractKeys(input)

        expect(received)
          .toHaveLength(expectedKeys.length)
        expect(received)
          .toEqual(expect.arrayContaining(expectedKeys))
      })
    })

    describe('symbol keys only', () => {
      const symbolKey1 = Symbol('tally-01')
      const symbolKey2 = Symbol('tally-02')
      const symbolKey3 = Symbol('tally-03')
      const symbolKey4 = Symbol('tally-04')

      const cases = [
        {
          input: {
            value: {
              [symbolKey1]: 1,
            },
          },
          expectedKeys: [symbolKey1],
        },
        {
          input: {
            value: {
              [symbolKey2]: 1,
            },
          },
          expectedKeys: [symbolKey2],
        },
        {
          input: {
            value: {
              [symbolKey3]: 1,
              [symbolKey4]: 100,
            },
          },
          expectedKeys: [symbolKey3, symbolKey4],
        },
      ]

      test.each(cases)('keys: $expectedKeys', ({ input, expectedKeys }) => {
        const received = converter.extractKeys(input)

        expect(received)
          .toHaveLength(expectedKeys.length)
        expect(received)
          .toEqual(expect.arrayContaining(expectedKeys))
      })
    })

    describe('complex keys', () => {
      const symbolKey1 = Symbol('tally-01')
      const symbolKey2 = Symbol('tally-02')
      const symbolKey3 = Symbol('tally-03')
      const symbolKey4 = Symbol('tally-04')

      const cases = [
        {
          input: {
            value: {
              aaa: 111,
              [symbolKey1]: 1,
            },
          },
          expectedKeys: ['aaa', symbolKey1],
        },
        {
          input: {
            value: {
              aaa: 111,
              [symbolKey2]: 1,
              bbb: 222,
            },
          },
          expectedKeys: ['aaa', symbolKey2, 'bbb'],
        },
        {
          input: {
            value: {
              id: 111,
              [symbolKey3]: 1,
              [symbolKey4]: 100,
            },
          },
          expectedKeys: ['id', symbolKey3, symbolKey4],
        },
      ]

      test.each(cases)('value: $input.value', ({ input, expectedKeys }) => {
        const received = converter.extractKeys(input)

        expect(received)
          .toHaveLength(expectedKeys.length)
        expect(received)
          .toEqual(expect.arrayContaining(expectedKeys))
      })
    })
  })
})
