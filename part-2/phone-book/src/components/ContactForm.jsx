const ContactForm = ({submitForm, nameFieldHandler, numberFieldHandler}) => {
    return (
        <section className={'contact_form'}>
            <header>
                <h2>New Contact</h2>
            </header>
            <form onSubmit={submitForm}>
                <div className={'contact_form__inputs'}>
                    <section>
                        <label htmlFor={'name'}>Name: </label>
                        <input onChange={nameFieldHandler} id={'name'} required={true}/>
                    </section>
                    <section>
                        <label htmlFor={'name'}>Number: </label>
                        <input onChange={numberFieldHandler} id={'number'} required={true}/>
                    </section>
                    <div>
                        <button type="submit">add</button>
                    </div>
                </div>
            </form>
        </section>
    );
};

export default ContactForm;