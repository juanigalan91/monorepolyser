import React from 'react';
import { Size, InputLabel, Dropdown, IconButton, Placement, Emphasis, FlexBox, Orientation } from '@lumx/react';
import { mdiHelp } from '@lumx/icons';

export interface LabelProps {
    label: string;
    helpers?: string[];
}

const NAMESPACE = 'label';
const Label: React.FC<LabelProps> = ({ label, helpers }) => {
    const anchorSimpleRef = React.useRef(null);
    const [isHelpOpen, setIsHelpOpen] = React.useState(false);

    const toggleHelp = () => setIsHelpOpen(!isHelpOpen);
    const closeHelp = () => setIsHelpOpen(false);

    return (
        <>
            <FlexBox orientation={Orientation.horizontal}>
                <InputLabel className={`${NAMESPACE}__label`}>{label}</InputLabel>
                {
                    helpers && helpers.length > 0 && (
                        <>
                        <IconButton
                            buttonRef={anchorSimpleRef}
                            icon={mdiHelp}
                            emphasis={Emphasis.low}
                            size={Size.s}
                            className={`${NAMESPACE}__help`}
                            onClick={toggleHelp}
                        />
                        <Dropdown
                            closeOnClick
                            closeOnEscape
                            isOpen={isHelpOpen}
                            onClose={closeHelp}
                            placement={Placement.BOTTOM_END}
                            anchorRef={anchorSimpleRef}
                        >
                            {helpers.map((helper, index) => (
                                <p className={`${NAMESPACE}__helper`} key={index}>
                                    {helper}
                                </p>
                            ))}
                        </Dropdown>
                        </>
                    )
                }
            </FlexBox>
        </>
    );
};

export { Label };
