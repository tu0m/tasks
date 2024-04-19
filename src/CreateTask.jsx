function CreateTask() {
    return (
        <form className="content" id="create-task">
            <input placeholder="Title"></input>
            <textarea placeholder="Additional Information…"></textarea>
            <input placeholder="Project"></input>
            <div>
                <span>Apr 18</span>
                <button>Save</button>
                <button>Cancel</button>
            </div>
        </form>
    )
}

export default CreateTask