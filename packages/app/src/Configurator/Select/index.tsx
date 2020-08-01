import React, { useCallback } from 'react';
import { List, ListItem, Select as LumxSelect, Size } from '@lumx/react';
import { useTranslate } from '../../Context';
import { Label } from '../Label';

export interface SelectProps {
    label: string;
    helpers?: string[];
    options: string[];
    onChange: (value: string) => void;
    value: string;
}

const NAMESPACE  = 'select';
const Select: React.FC<SelectProps> = ({ options, label, helpers, onChange, value }) => {
    const { translate } = useTranslate();
    const [isOpen, setIsOpen] = React.useState(false);

    const onSelectToggle = (toggle: boolean) => () => setIsOpen(toggle);

    const selectItem = useCallback((item: string) => () => {
        onChange(item);

        onSelectToggle(false)
    }, [onChange]);

    return (
        <div className={NAMESPACE}>
            <Label label={label} helpers={helpers} />
            <LumxSelect
                isOpen={isOpen}
                value={translate(value)}
                onInputClick={onSelectToggle(true)}
                onDropdownClose={onSelectToggle(false)}
            >
                <List isClickable>
                    {options.map((choice, index) => (
                            <ListItem
                                isSelected={translate(value) === choice}
                                key={index}
                                onItemSelected={selectItem(choice)}
                                size={Size.tiny}
                            >
                                {translate(choice)}
                            </ListItem>
                        ))
                    }
                </List>
            </LumxSelect>
        </div>
    );
};

export { Select };
