import {
  GeneChainSplicer,
} from '@openreachtech/mentsu-gene-chain-splicer'

import DeepContainingConverter from './DeepContainingConverter.js'

const splicer = GeneChainSplicer.create({
  core: expect,
})

splicer.spliceGene({
  mixin: {
    /**
     * Deep containing matcher.
     *
     * @param {*} value - The value to be converted.
     * @param {{
     *   convertsArray?: boolean
     * }} [options] - Options.
     * @returns {*} - Converted value.
     */
    deepContaining (
      value,
      {
        convertsArray = false,
      } = {}
    ) {
      const converter = DeepContainingConverter.create({
        rawExpect: expect,
        convertsArray,
      })

      return converter.deepConvert({
        value,
      })
    },
  },
})
