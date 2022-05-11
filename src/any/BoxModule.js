import { Box } from "./Box.js";
import { ModuleMixin } from "./mixins/ModuleMixin.js";


/**
 * The same as {@link Box}, but has a property for module specifiers (import
 * specifiers and require ids)
 *
 * This class is deliberately generic and provided for convenience, intended to
 * be extended for your own use cases.
 *
 * By default, this uses handler's generateIdentifier function for it's ids. If
 * this is undesirable, extend the class and replace Block#_getIdentifier by
 * adding a static function of the same name.
 *
 * Note that you may be better off using your own implementation, and that doing
 * so is fine. Regular objects also work as blocks, as long as you follow the
 * specification of the construct you're using them with.
 * @abstract
 */
class BoxModule extends ModuleMixin(Box) {}

export { BoxModule };
