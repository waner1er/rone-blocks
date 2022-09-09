import {useBlockProps} from '@wordpress/block-editor';
import './editor.scss'

export default function Edit(props) {
	const {__} = wp.i18n
	const {Fragment} = wp.element;
	const {
		MediaUpload, MediaUploadCheck, InspectorControls
	} = wp.editor
	const {
		Placeholder, Button, IconButton, TextControl, PanelBody
	} = wp.components

	const blockProps = useBlockProps();

	// Attribution des informations de l'image
	const onSelectImage = picture => {
		props.setAttributes({
			pictureID: picture.id,
			pictureURL: picture.url,
			pictureAlt: picture.alt,
		})
	}
	// Effacement des données de l'image
	const onRemoveImage = () => {
		props.setAttributes({
			pictureID: null,
			pictureURL: null,
			pictureAlt: null,
		})
	}

	// function SkillsItemDisplay() {
	// 	const skills = props.attributes.skills;
	// 	const skill = skills.map(val => val);
	//
	// 	return (<div>{skill}</div>)
	// }
	//
	// function SkillsItemAdd() {
	// 	return (<div>
	// 		<Button>Add</Button>
	// 	</div>)
	//
	// }
	const handleAddSkill = () => {
		const skills = [...props.attributes.skills];
		skills.push({
			skill: 'test',
		});
		props.setAttributes({skills});
	};

	const handleRemoveSkill = (index) => {
		const skills = [...props.attributes.skills];
		skills.splice(index, 1);
		props.setAttributes({skills});
	};

	const handleSkillChange = (skill, index) => {
		const skills = [...props.attributes.skills];
		skills[index].skill = skill;
		props.setAttributes({skills});
	};

	let skillFields,
		skillDisplay;

	if (props.attributes.skills.length) {
		skillFields = props.attributes.skills.map((skill, index) => {
			return <Fragment key={index}>
				<TextControl
					className="r1-skill"
					placeholder="new skill"
					value={props.attributes.skills[index].skill}
					onChange={(skill) => handleSkillChange(skill, index)}
				/>
				<IconButton
					className="r1_remove-skill"
					icon="no-alt"
					label="Delete skill"
					onClick={() => handleRemoveSkill(index)}
				/>
			</Fragment>;
		});

		skillDisplay = props.attributes.skills.map((skill, index) => {
			return <p key={index}>{skill}</p>;
		});
	}

	return (

		<div {...blockProps}>
			<InspectorControls key="1">
				<PanelBody title={ __( 'Skills' ) }>
					{ skillFields }
					<Button
						isDefault
						// onClick={ handleAddSkill().bind( this ) }
					>
						{ __( 'Add Skill' ) }
					</Button>
				</PanelBody>
			</InspectorControls>
			<div className={'wp-block-create-block-rone-blocks-2__wrapper'}>
				{!props.attributes.pictureID ? (
					<MediaUploadCheck>
						<MediaUpload
							onSelect={onSelectImage}
							allowedTypes={['image']}
							value={props.attributes.pictureID}
							render={({open}) => (
								<Placeholder
									icon="images-alt"
									label={__('Photo', 'capitainewp-gut-bases')}
									instructions={__('Select a picture', 'capitainewp-gut-bases')}
								>
									<Button
										isSecondary
										isLarge
										onClick={open}
										icon="upload"
									>
										{__('Import', 'capitainewp-gut-bases')}
									</Button>
								</Placeholder>
							)}
						/>
					</MediaUploadCheck>
				) : (
					<p className="capitaine-image-wrapper">
						<img
							src={props.attributes.pictureURL}
							alt={props.attributes.pictureAlt}
						/>

						{props.isSelected && (

							<Button
								className="capitaine-remove-image"
								onClick={onRemoveImage}
								icon="dismiss"
							>
								{__('Remove picture', 'capitainewp-gut-bases')}
							</Button>

						)}
					</p>
				)
				}
			</div>
			<div key="2" className={"toto"}>
				<h2>Block</h2>
				{skillDisplay}
			</div>
		</div>
	)
}
