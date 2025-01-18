import {Accessor, Component, createSignal, JSX, JSXElement} from 'solid-js';
import {styled} from 'solid-styled-components';

import {Select, SelectRootProps} from '@kobalte/core/select';

import './style.css';
import {vars} from '../css';

export type SelectOption = {
  label: JSXElement;
  value: string;
};

export type SelectProps = {
  // value?: string;
  defaultValue?: SelectOption;
  options: SelectOption[];
  onChange: (option: SelectOption | null) => void;
} & Pick<SelectRootProps<SelectOption>, 'placeholder'>;

const Container = styled('div')({});

export const Field: Component<SelectProps> = (props) => {
  return (
    <Container>
      <Select
        style={{
          'font-size': vars.select.fontSize,
        }}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        options={props.options}
        optionValue="value"
        // optionTextValue="label"
        placeholder={props.placeholder}
        itemComponent={(props) => (
          <Select.Item item={props.item} class="select__item">
            <Select.ItemLabel class="select__itemlabel">
              {props.item.rawValue.label}
            </Select.ItemLabel>
            {/* <Select.ItemIndicator class="select__item-indicator">
              x
            </Select.ItemIndicator> */}
          </Select.Item>
        )}
      >
        <Select.Trigger
          class="select__trigger"
          style={{'background-color': vars.select.backgroundColor}}
        >
          <Select.Value<SelectOption> class="select__value">
            {(state) => state.selectedOption().label}
          </Select.Value>
          {/* <Select.Icon class="select__icon">x</Select.Icon> */}
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            style={{
              'font-size': vars.select.fontSize,
              'background-color': vars.select.backgroundColor,
            }}
            class="select__content"
          >
            <Select.Listbox
              class="select__listbox"
              style={{
                gap: vars.gap,
              }}
            />
          </Select.Content>
        </Select.Portal>
      </Select>
    </Container>
  );
};
