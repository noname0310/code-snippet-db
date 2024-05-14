import { useState } from 'react';
import styled from 'styled-components';

export interface LintOption {
    indent: 2 | 4 | null;
    semi: 'always' | 'never' | null;
    linebreakStyle: 'unix' | 'windows' | null;
    quotes: 'single' | 'double' | null;
    braceStyle: '1tbs' | 'allman' | 'stroustrup' | null;
}

const LintOptionFormOuterDiv = styled.div`
    width: 100%;
    max-width: 400px;
    padding-top: 10px;
`;

const LintOptionFormHeaderDiv = styled.div`
    font-size: 16px;
    background-color: ${props => props.theme.colors.secondary};
    padding: 10px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    cursor: pointer;
`;

const LintOptionFormTitleDiv = styled.div`
    font-size: 16px;
`;

const LintOptionFormOpenStateDiv = styled.div`
    font-size: 16px;
`;

const LintOptionFormContentDiv = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    padding-bottom: 0px;
    box-sizing: border-box;

    border: 3px solid ${props => props.theme.colors.secondary};
    border-top: none;
`;

const OptionRowDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
`;

const OptionLabelDiv = styled.div`
    font-size: 14px;
    margin-right: 10px;
`;

const OptionDropdown = styled.select`
    font-size: 14px;
    padding: 5px;
    margin-right: 10px;
    width: 100px;

    background-color: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.textLight};
`;

interface LintOptionFormProps {
    lintOption: LintOption;
    onLintOptionChange: (lintOption: LintOption) => void;
    error: string | null;
}

function LintOptionForm(props: LintOptionFormProps): JSX.Element {
    const { lintOption, onLintOptionChange, error } = props;

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const formContent = error ? (
        <>
            Unable due to parsing error
            {
                error.split('\n').map((line, index) => (
                    <p key={index}>{line}</p>
                ))
            }
        </>
    ) : (
        <>
            <OptionRowDiv>
                <OptionLabelDiv>Indent</OptionLabelDiv>
                <OptionDropdown
                    value={lintOption.indent || ''}
                    onChange={e => onLintOptionChange({
                        ...lintOption,
                        indent: e.target.value === ''
                            ? null
                            : parseInt(e.target.value) as 2 | 4 })}>
                    <option value="">None</option>
                    <option value="2">2</option>
                    <option value="4">4</option>
                </OptionDropdown>
            </OptionRowDiv>
            <OptionRowDiv>
                <OptionLabelDiv>Semicolon</OptionLabelDiv>
                <OptionDropdown
                    value={lintOption.semi || ''}
                    onChange={e => onLintOptionChange({
                        ...lintOption,
                        semi: e.target.value === ''
                            ? null
                            : e.target.value as 'always' | 'never' })}>
                    <option value="">None</option>
                    <option value="always">Always</option>
                    <option value="never">Never</option>
                </OptionDropdown>
            </OptionRowDiv>
            <OptionRowDiv>
                <OptionLabelDiv>Linebreak Style</OptionLabelDiv>
                <OptionDropdown
                    value={lintOption.linebreakStyle || ''}
                    onChange={e => onLintOptionChange({
                        ...lintOption,
                        linebreakStyle: e.target.value === ''
                            ? null
                            : e.target.value as 'unix' | 'windows' })}>
                    <option value="">None</option>
                    <option value="unix">Unix</option>
                    <option value="windows">Windows</option>
                </OptionDropdown>
            </OptionRowDiv>
            <OptionRowDiv>
                <OptionLabelDiv>Quotes</OptionLabelDiv>
                <OptionDropdown
                    value={lintOption.quotes || ''}
                    onChange={e => onLintOptionChange({
                        ...lintOption,
                        quotes: e.target.value === ''
                            ? null
                            : e.target.value as 'single' | 'double' })}>
                    <option value="">None</option>
                    <option value="single">Single</option>
                    <option value="double">Double</option>
                </OptionDropdown>
            </OptionRowDiv>
            <OptionRowDiv>
                <OptionLabelDiv>Brace Style</OptionLabelDiv>
                <OptionDropdown
                    value={lintOption.braceStyle || ''}
                    onChange={e => onLintOptionChange({
                        ...lintOption,
                        braceStyle: e.target.value === ''
                            ? null
                            : e.target.value as '1tbs' | 'allman' | 'stroustrup' })}>
                    <option value="">None</option>
                    <option value="1tbs">1tbs</option>
                    <option value="allman">Allman</option>
                    <option value="stroustrup">Stroustrup</option>
                </OptionDropdown>
            </OptionRowDiv>
        </>
    );

    return (
        <LintOptionFormOuterDiv>
            <LintOptionFormHeaderDiv onClick={() => setIsOpen(!isOpen)}>
                <LintOptionFormTitleDiv>
                    Lint Options
                </LintOptionFormTitleDiv>
                <LintOptionFormOpenStateDiv>
                    {isOpen ? '▲' : '▼'}
                </LintOptionFormOpenStateDiv>
            </LintOptionFormHeaderDiv>
            {isOpen && (
                <LintOptionFormContentDiv>
                    {formContent}
                </LintOptionFormContentDiv>
            )}
        </LintOptionFormOuterDiv>
    );
}

export default LintOptionForm;
