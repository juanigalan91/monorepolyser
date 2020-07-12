import React from 'react';
import { List, ListItem, Select, Size } from '@lumx/react';
import { useTranslate } from '../../Context';
import { Label } from '../Label';

const OPTIONS = ['DEPENDENCIES', 'DEV_DEPENDENCIES', 'ALL_DEPENDENCIES'];

const Dependencies: React.FC<any> = () => {
    const { translate } = useTranslate();
    const label = translate('CHOOSE_THE_DEPENDENCIES_YOU_WANT_TO_ANALYZE');
    const helpers = [translate('CHOOSE_THE_DEPENDENCIES_YOU_WANT_TO_ANALYZE_HELP'), translate('TAKE_INTO_CONSIDERATION_THAT_SELECTING_ALL_DEPENDENCIES')];

    const [value, setValue] = React.useState<string>(OPTIONS[0]);
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
        <>
            <Label label={label} helpers={helpers} />
            <Select
                isOpen={isOpen}
                value={translate(value)}
                onInputClick={onSelectOpen}
                onDropdownClose={onSelectClose}
            >
                <List isClickable>
                    {OPTIONS.map((choice, index) => (
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
            </Select>
        </>
    );
};

export { Dependencies };
