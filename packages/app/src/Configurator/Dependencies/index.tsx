import React, { SyntheticEvent } from 'react';
import { List, ListItem, Select, Size } from '@lumx/react';
import { useTranslate } from '../../Context';

const OPTIONS = ['DEPENDENCIES', 'DEV_DEPENDENCIES', 'ALL_DEPENDENCIES'];

const Dependencies: React.FC<any> = () => {
    const { translate } = useTranslate();
    const LABEL = translate('WHAT_DEPENDENCIES_DO_YOU_WANT_TO_SEE');
    const HELPER = translate('CHOOSE_WHAT_DEPENDENCIES_YOU_WANT_TO_SEE');

    const [value, setValue] = React.useState<string>(OPTIONS[0]);
    const [isOpen, setIsOpen] = React.useState(false);

    const clearSelected = (event: SyntheticEvent) => {
        event.stopPropagation();
        setValue('');
    };

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
        <Select
            style={{ width: '100%' }}
            isOpen={isOpen}
            value={translate(value)}
            onClear={clearSelected}
            label={LABEL}
            onInputClick={onSelectOpen}
            onDropdownClose={onSelectClose}
            helper={HELPER}
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
    );
};

export { Dependencies };
