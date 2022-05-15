import { Updates } from 'set-array'

/**
 * Modifies the merge mode.
 */
type MergeMode = 'deep' | 'shallow' | 'none'

/**
 * The second value has the same shape as the first except:
 *  - Objects can modify the merge mode using a `_merge` property
 *  - Arrays can be "updates" objects instead like { [index]: item, ... }
 */
type SecondValue<T, KeyOpt extends keyof any> = T extends (infer ArrayItem)[]
  ? SecondValue<ArrayItem, KeyOpt>[] | Updates<SecondValue<ArrayItem, KeyOpt>>
  : T extends object
  ? {
      [Prop in Exclude<keyof T, KeyOpt>]?: SecondValue<T[Prop], KeyOpt>
    } & { [KeyProp in KeyOpt]?: MergeMode }
  : T

type Key = string | symbol
type DefaultKey = '_merge'

/**
 *
 * @example
 * ```js
 * ```
 */
export default function partialMerge<T, KeyOpt extends Key = DefaultKey>(
  firstValue: T,
  secondValue: SecondValue<T, KeyOpt extends never ? KeyOpt : KeyOpt>,
  /**
   * Customize the name of the property used to change the merge mode.
   *
   * @default "_merge"
   */
  options?: { key?: KeyOpt },
): T
