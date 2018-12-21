import React from 'react';
import { mount } from 'enzyme';
import { Composer } from './';


const props = {
    _createPost: jest.fn(),
};

const comment = 'Merry Christmas';

const initialState = {
    comment: '',
};

const updatedState = {
    comment,
};

const result = mount(<Composer { ...props } />);

const _submitCommentSpy = jest.spyOn(result.instance(), '_submitComment');
const _handleFormSubmitSpy = jest.spyOn(result.instance(), '_handleFormSubmit');
const _updateCommentSpy = jest.spyOn(result.instance(), '_updateComment');

describe('Composer component:', () => {

    // markup
    test('component should have only 1 "section" element', () => {
        expect(result.find('section').length).toBe(1); // was changed by me
    });

    test('component should have only 1 "form" element', () => {
        expect(result.find('form')).toHaveLength(1);
    });

    test('component should have only 1 "input" element', () => {
        expect(result.find('input')).toHaveLength(1);
    });

    test('component should have only 1 "textarea" element', () => {
        expect(result.find('textarea')).toHaveLength(1);
    });

    test('component should have only 1 "img" element', () => {
        expect(result.find('img')).toHaveLength(1);
    });
    // eof markup

    test('component should have valid initial state', () => {
        expect(result.state()).toEqual(initialState);
    });

    test('component should be empty initially', () => {
        expect(result.find('textarea').text()).toBe('');
    });

    test('should respond to state change properly', () => {
        result.setState({
            comment,
        });
        expect(result.state()).toEqual(updatedState);
        expect(result.find('textarea').text()).toBe(comment);

        result.setState({
            comment: '',
        });
        expect(result.state()).toEqual(initialState);
        expect(result.find('textarea').text()).toBe('');
    });

    test('should handle "change" event', () => {
        result.find('textarea').simulate('change', {
            target: {
                value: comment,
            }
        });

        expect(result.find('textarea').text()).toBe(comment);
        expect(result.state()).toEqual(updatedState);
    });

    test('should handle "submit" event', () => {
        result.find('form').simulate('submit');

        expect(result.state()).toEqual(initialState);
    });

    test('_createPost prop should be invoked once after form submission', () => {
        expect(props._createPost).toHaveBeenCalled();
    });

    test('_createPost prop should be invoked once after form submission', () => {
        expect(props._createPost).toHaveBeenCalled();
    });

    test('_submitCommentSpy & _handleFormSubmitSpy class`s methods should be invoked once after form is submitted', () => {
        expect(_submitCommentSpy).toHaveBeenCalledTimes(1);
        expect(_handleFormSubmitSpy).toHaveBeenCalledTimes(1);
        expect(_updateCommentSpy).toHaveBeenCalledTimes(1);
    });

});
