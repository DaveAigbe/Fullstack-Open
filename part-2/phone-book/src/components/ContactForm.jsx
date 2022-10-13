const ContactForm = ({submitForm, nameRef, numberRef }) => {
    return (
            <form onSubmit={submitForm}>
                <div className={'flex justify-center items-center flex-col gap-2'}>
                    <table className={''}>
                        <thead>
                            <tr>
                                <th className={'text-center'}>New Contact</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><label htmlFor={'name'}>Name: </label></td>
                                <td><input className={'border-amber-900 border-2'} ref={nameRef} id={'name'} required={true}/></td>
                            </tr>
                            <tr>
                                <td><label htmlFor={'name'}>Number: </label></td>
                                <td><input className={'border-amber-900 border-2'} ref={numberRef} id={'number'} required={true}/></td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <button className={'bg-green-700 hover:bg-green-600 hover:scale-125 transition text-white font-bold py-2 px-4 rounded-full'} type="submit">
                            Add
                        </button>
                    </div>
                </div>
            </form>
    );
};

export default ContactForm;
