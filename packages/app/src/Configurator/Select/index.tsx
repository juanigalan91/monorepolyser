import React from 'react';
import { List, ListItem, Select as LumxSelect, Size } from '@lumx/react';
import { useTranslate } from '../../Context';
import { Label } from '../Label';

export interface SelectProps {
    label: string;
    helpers?: string[];
    options: string[];
}

const NAMESPACE  = 'select';
const Select: React.FC<SelectProps> = ({ options, label, helpers }) => {
    const { translate } = useTranslate();
    const [value, setValue] = React.useState<string>(options[0]);
    const [isOpen, setIsOpen] = React.useState(false);

    const onSelectOpen = () => {
        setIsOpen(true);
    }

    const onSelectClose = () => {
        setIsOpen(false);
    }

    const selectItem = (item: string) => () => {
        if (value === item) {
            setValue('');
        } else {
            setValue(item);
        }

        onSelectClose();
    };

    return (
        <div className={NAMESPACE}>
            <Label label={label} helpers={helpers} />
            <LumxSelect
                isOpen={isOpen}
                value={translate(value)}
                onInputClick={onSelectOpen}
                onDropdownClose={onSelectClose}
            >
                <List isClickable>
                    {options.map((choice, index) => (
                            <ListItem
                                isSelected={value === choice}
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
