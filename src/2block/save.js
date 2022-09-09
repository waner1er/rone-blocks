/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {useBlockProps} from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({attributes}) {
	const blockProps = useBlockProps.save();
	return <div {...blockProps}>
		<div className={'wp-block-create-block-rone-blocks-2__wrapper'}>
			<img src={attributes.pictureURL} alt={attributes.pictureAlt}/>
			<div className={'wp-block-create-block-rone-blocks-2__wrapper__table'}>
				<div>
					<p>Company</p>
				</div>
				<div>
					<p>Contact</p>
				</div>
				<div>
					<p>Country</p>
				</div>
				<div>
					<p>eds FutterkisteAlfr</p>
				</div>
				<div>
					<p>a AndersMari</p></div>
				<div>
					<p>Germany</p>
				</div>
				<div>
					<p>ro comercial MoctezumaCent</p>
				</div>
				<div>
					<p>cisco ChangFran</p>
					</div>
				<div>
					<p>Mexico</p>
				</div>
			</div>
		</div>
	</div>
;
}
