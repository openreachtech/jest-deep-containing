describe('expect.deepContaining()', () => {
  describe('with skipsArray: true', () => {
    /**
     * @type {Array<{
     *   input: {
     *     expectedCore: *
     *   }
     *   truthyCases: Array<{
     *     received: *
     *   }>
     *   falsyCases: Array<{
     *     received: *
     *   }>
     * }>}
     */
    const cases = [
      {
        input: {
          expectedCore: {
            alpha: 1000,
            beta: 'second',
          },
        },
        truthyCases: [
          {
            received: {
              alpha: 1000,
              beta: 'second',
            },
          },
          {
            received: {
              alpha: 1000,
              beta: 'second',
              gamma: {}, // ✅️ extra property
            },
          },
        ],
        falsyCases: [
          {
            received: {
              alpha: 9999, // ❌️
              beta: 'second',
            },
          },
          {
            received: {
              alpha: 1000,
              beta: 'second not equal', // ❌️
            },
          },
          {
            received: {
              // alpha: 1000, // ❌️ missing property
              beta: 'second',
            },
          },
          {
            received: {
              alpha: 1000,
              // beta: 'second', // ❌️ missing property
            },
          },
          {
            received: {
              // alpha: 1000, // ❌️ missing property
              // beta: 'second', // ❌️ missing property
            },
          },
        ],
      },
      {
        input: {
          expectedCore: {
            alpha: 2000,
            beta: 'two',
            gamma: {
              delta: true,
              epsilon: Symbol.for('epsilon'),
            },
          },
        },
        truthyCases: [
          {
            received: {
              alpha: 2000,
              beta: 'two',
              gamma: {
                delta: true,
                epsilon: Symbol.for('epsilon'),
              },
            },
          },
          {
            received: {
              alpha: 2000,
              beta: 'two',
              gamma: {
                delta: true,
                epsilon: Symbol.for('epsilon'),
              },
              omega: 123450000000000000n, // ✅️ extra property
            },
          },
          {
            received: {
              alpha: 2000,
              beta: 'two',
              gamma: {
                delta: true,
                epsilon: Symbol.for('epsilon'),
                omega: 123450000000000000n, // ✅️ extra property
              },
            },
          },
        ],
        falsyCases: [
          {
            received: {
              // alpha: 2000, // ❌️ missing property
              beta: 'two',
              gamma: {
                delta: true,
                epsilon: Symbol.for('epsilon'),
              },
            },
          },
          {
            received: {
              alpha: 2000,
              beta: 'two',
              // gamma: { // ❌️ missing property
              //   delta: true,
              //   epsilon: Symbol.for('epsilon'),
              // },
            },
          },
          {
            received: {
              alpha: 2000,
              beta: 'two',
              gamma: {
                // delta: true, // ❌️ missing property
                epsilon: Symbol.for('epsilon'),
              },
            },
          },
          {
            received: {
              alpha: 2000,
              beta: 'two',
              gamma: {
                delta: true,
                // epsilon: Symbol.for('epsilon'), // ❌️ missing property
              },
            },
          },
        ],
      },
      {
        input: {
          expectedCore: {
            alpha: 3000,
            beta: [ // fixed order, when skipsArray is true
              'first',
              'second',
              'third',
            ],
          },
        },
        truthyCases: [
          {
            received: {
              alpha: 3000,
              beta: [
                'first',
                'second',
                'third',
              ],
            },
          },
          {
            received: {
              alpha: 3000,
              beta: [
                'first',
                'second',
                'third',
              ],
              gamma: {}, // ✅️ extra property
            },
          },
        ],
        falsyCases: [
          {
            received: {
              // alpha: 3000, // ❌️ missing property
              beta: [
                'first',
                'second',
                'third',
              ],
            },
          },
          {
            received: {
              alpha: 3000,
              // beta: [ // ❌️ missing property
              //   'first',
              //   'second',
              //   'third',
              // ],
            },
          },
          {
            received: {
              alpha: 3000,
              beta: [
                'first',
                // 'second', // ❌️ missing element
                'third',
              ],
            },
          },
          {
            received: {
              alpha: 3000,
              beta: [
                'first',
                'third', // ❌️ wrong order (without expect.arrayContaining())
                'second', // ❌️ wrong order (without expect.arrayContaining())
              ],
            },
          },
        ],
      },
      {
        input: {
          expectedCore: [
            {
              alpha: 4001,
              beta: [
                'first',
                'second',
                'third',
              ],
            },
            {
              alpha: 4002,
              beta: [
                'fourth',
                'fifth',
              ],
            },
          ],
        },
        truthyCases: [
          {
            received: [
              {
                alpha: 4001,
                beta: [
                  'first',
                  'second',
                  'third',
                ],
                gamma: 'extra', // ✅️ extra property
              },
              {
                alpha: 4002,
                beta: [
                  'fourth',
                  'fifth',
                ],
              },
            ],
          },
          {
            received: [
              {
                alpha: 4001,
                beta: [
                  'first',
                  'second',
                  'third',
                ],
              },
              {
                alpha: 4002,
                beta: [
                  'fourth',
                  'fifth',
                ],
                gamma: 'extra', // ✅️ extra property
              },
            ],
          },
        ],
        falsyCases: [
          {
            received: [
              {
                alpha: 4001,
                beta: [
                  'first',
                  'second',
                  'third',
                  'extra', // ❌️ extra element
                ],
              },
              {
                alpha: 4002,
                beta: [
                  'fourth',
                  'fifth',
                ],
              },
            ],
          },
          {
            received: [
              {
                alpha: 4001,
                beta: [
                  'first',
                  'second',
                  'third',
                ],
              },
              {
                alpha: 4002,
                beta: [
                  'extra', // ❌️ extra element
                  'fourth',
                  'fifth',
                ],
              },
            ],
          },
          {
            received: [
              {
                alpha: 4001,
                beta: [
                  // 'first', // ❌️ missing element
                  'second',
                  'third',
                ],
              },
              {
                alpha: 4002,
                beta: [
                  'fourth',
                  'fifth',
                ],
              },
            ],
          },
          {
            received: [
              {
                alpha: 4001,
                beta: [
                  'first',
                  'second',
                  'third',
                ],
              },
              {
                alpha: 4002,
                beta: [
                  'fourth',
                  // 'fifth', // ❌️ missing element
                ],
              },
            ],
          },
        ],
      },
    ]

    describe.each(cases)('expectedCore: $input.expectedCore', ({ input, truthyCases, falsyCases }) => {
      describe('truthy cases', () => {
        describe('with skipsArray: true', () => {
          test.each(truthyCases)('received: $received', ({ received }) => {
            const expected = expect.deepContaining(input.expectedCore, {
              skipsArray: true,
            })

            expect(received)
              .toEqual(expected)
          })
        })
      })

      describe('falsy cases', () => {
        describe('with skipsArray: true', () => {
          test.each(falsyCases)('received: $received', ({ received }) => {
            const expected = expect.deepContaining(input.expectedCore, {
              skipsArray: true,
            })

            expect(received)
              .not
              .toEqual(expected)
          })
        })
      })
    })
  })

  describe('with skipsArray: false', () => {
    /**
     * @type {Array<{
     *   input: {
     *     expectedCore: *
     *   }
     *   truthyCases: Array<{
     *     received: *
     *   }>
     *   falsyCases: Array<{
     *     received: *
     *   }>
     * }>}
     */
    const cases = [
      {
        input: {
          expectedCore: {
            alpha: 1000,
            beta: 'second',
          },
        },
        truthyCases: [
          {
            received: {
              alpha: 1000,
              beta: 'second',
            },
          },
          {
            received: {
              alpha: 1000,
              beta: 'second',
              gamma: {}, // ✅️ extra property
            },
          },
        ],
        falsyCases: [
          {
            received: {
              alpha: 9999, // ❌️
              beta: 'second',
            },
          },
          {
            received: {
              alpha: 1000,
              beta: 'second not equal', // ❌️
            },
          },
          {
            received: {
              // alpha: 1000, // ❌️ missing property
              beta: 'second',
            },
          },
          {
            received: {
              alpha: 1000,
              // beta: 'second', // ❌️ missing property
            },
          },
          {
            received: {
              // alpha: 1000, // ❌️ missing property
              // beta: 'second', // ❌️ missing property
            },
          },
        ],
      },
      {
        input: {
          expectedCore: {
            alpha: 2000,
            beta: 'two',
            gamma: {
              delta: true,
              epsilon: Symbol.for('epsilon'),
            },
          },
        },
        truthyCases: [
          {
            received: {
              alpha: 2000,
              beta: 'two',
              gamma: {
                delta: true,
                epsilon: Symbol.for('epsilon'),
              },
            },
          },
          {
            received: {
              alpha: 2000,
              beta: 'two',
              gamma: {
                delta: true,
                epsilon: Symbol.for('epsilon'),
              },
              omega: 123450000000000000n, // ✅️ extra property
            },
          },
          {
            received: {
              alpha: 2000,
              beta: 'two',
              gamma: {
                delta: true,
                epsilon: Symbol.for('epsilon'),
                omega: 123450000000000000n, // ✅️ extra property
              },
            },
          },
        ],
        falsyCases: [
          {
            received: {
              // alpha: 2000, // ❌️ missing property
              beta: 'two',
              gamma: {
                delta: true,
                epsilon: Symbol.for('epsilon'),
              },
            },
          },
          {
            received: {
              alpha: 2000,
              beta: 'two',
              // gamma: { // ❌️ missing property
              //   delta: true,
              //   epsilon: Symbol.for('epsilon'),
              // },
            },
          },
          {
            received: {
              alpha: 2000,
              beta: 'two',
              gamma: {
                // delta: true, // ❌️ missing property
                epsilon: Symbol.for('epsilon'),
              },
            },
          },
          {
            received: {
              alpha: 2000,
              beta: 'two',
              gamma: {
                delta: true,
                // epsilon: Symbol.for('epsilon'), // ❌️ missing property
              },
            },
          },
        ],
      },
      {
        input: {
          expectedCore: {
            alpha: 3000,
            beta: [ // not-fixed order, when skipsArray is false
              'first',
              'second',
              'third',
            ],
          },
        },
        truthyCases: [
          {
            received: {
              alpha: 3000,
              beta: [
                'first',
                'second',
                'third',
              ],
            },
          },
          {
            received: {
              alpha: 3000,
              beta: [
                'first',
                'second',
                'third',
              ],
              gamma: {}, // ✅️ extra property
            },
          },
          {
            received: {
              alpha: 3000,
              beta: [
                'first',
                'third', // ✅️ wrong order (using expect.arrayContaining())
                'second', // ✅️ wrong order (using expect.arrayContaining())
              ],
            },
          },
        ],
        falsyCases: [
          {
            received: {
              // alpha: 3000, // ❌️ missing property
              beta: [
                'first',
                'second',
                'third',
              ],
            },
          },
          {
            received: {
              alpha: 3000,
              // beta: [ // ❌️ missing property
              //   'first',
              //   'second',
              //   'third',
              // ],
            },
          },
          {
            received: {
              alpha: 3000,
              beta: [
                'first',
                // 'second', // ❌️ missing element
                'third',
              ],
            },
          },
        ],
      },
      {
        input: {
          expectedCore: [
            {
              alpha: 4001,
              beta: [
                'first',
                'second',
                'third',
              ],
            },
            {
              alpha: 4002,
              beta: [
                'fourth',
                'fifth',
              ],
            },
          ],
        },
        truthyCases: [
          {
            received: [
              {
                alpha: 4001,
                beta: [
                  'first',
                  'second',
                  'third',
                ],
                gamma: 'extra', // ✅️ extra property
              },
              {
                alpha: 4002,
                beta: [
                  'fourth',
                  'fifth',
                ],
              },
            ],
          },
          {
            received: [
              {
                alpha: 4001,
                beta: [
                  'first',
                  'second',
                  'third',
                ],
              },
              {
                alpha: 4002,
                beta: [
                  'fourth',
                  'fifth',
                ],
                gamma: 'extra', // ✅️ extra property
              },
            ],
          },
          {
            received: [
              {
                alpha: 4001,
                beta: [
                  'first',
                  'second',
                  'third',
                  'extra', // ✅️ extra element
                ],
              },
              {
                alpha: 4002,
                beta: [
                  'fourth',
                  'fifth',
                ],
              },
            ],
          },
          {
            received: [
              {
                alpha: 4001,
                beta: [
                  'first',
                  'second',
                  'third',
                ],
              },
              {
                alpha: 4002,
                beta: [
                  'extra', // ✅️ extra element
                  'fourth',
                  'fifth',
                ],
              },
            ],
          },
          {
            received: [
              {
                alpha: 4001,
                beta: [
                  'first',
                  'second',
                  'third',
                ],
              },
              {
                alpha: 4002,
                beta: [
                  'fifth', // ✅️ wrong order (using expect.arrayContaining())
                  'fourth', // ✅️ wrong order (using expect.arrayContaining())
                ],
              },
            ],
          },
          {
            received: [
              // ✅️ wrong order (using expect.arrayContaining())
              {
                alpha: 4002,
                beta: [
                  'fourth',
                  'fifth',
                ],
              },
              // ✅️ wrong order (using expect.arrayContaining())
              {
                alpha: 4001,
                beta: [
                  'first',
                  'second',
                  'third',
                ],
              },
            ],
          },
        ],
        falsyCases: [
          {
            received: [
              {
                alpha: 4001,
                beta: [
                  // 'first', // ❌️ missing element
                  'second',
                  'third',
                ],
              },
              {
                alpha: 4002,
                beta: [
                  'fourth',
                  'fifth',
                ],
              },
            ],
          },
          {
            received: [
              {
                alpha: 4001,
                beta: [
                  'first',
                  'second',
                  'third',
                ],
              },
              {
                alpha: 4002,
                beta: [
                  'fourth',
                  // 'fifth', // ❌️ missing element
                ],
              },
            ],
          },
        ],
      },
    ]

    describe.each(cases)('expectedCore: $input.expectedCore', ({ input, truthyCases, falsyCases }) => {
      describe('truthy cases', () => {
        describe('with given skipsArray as false', () => {
          test.each(truthyCases)('received: $received', ({ received }) => {
            const expected = expect.deepContaining(input.expectedCore, {
              skipsArray: false,
            })

            expect(received)
              .toEqual(expected)
          })
        })

        describe('with no options', () => {
          test.each(truthyCases)('received: $received', ({ received }) => {
            const expected = expect.deepContaining(input.expectedCore)

            expect(received)
              .toEqual(expected)
          })
        })
      })

      describe('falsy cases', () => {
        describe('with given skipsArray as false', () => {
          test.each(falsyCases)('received: $received', ({ received }) => {
            const expected = expect.deepContaining(input.expectedCore, {
              skipsArray: false,
            })

            expect(received)
              .not
              .toEqual(expected)
          })
        })

        describe('with no options', () => {
          test.each(falsyCases)('received: $received', ({ received }) => {
            const expected = expect.deepContaining(input.expectedCore, {
              skipsArray: false,
            })

            expect(received)
              .not
              .toEqual(expected)
          })
        })
      })
    })
  })
})
