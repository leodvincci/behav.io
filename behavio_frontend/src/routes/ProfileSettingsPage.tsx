import Header from "../components/ui/Header"
import SettingsImage from "../components/ui/SettingsImage"

const ProfileSettingsPage: React.FC = () => {
  return (
    <>
      <Header />
      <main className="min-h-fit py-20 bg-accent min-w-full flex flex-col items-center tracking-wide text-black gap-10 p-3">
        <section className="flex flex-col md:flex-row gap-10 md:gap-20 items-center">
          <h1 className="text-4xl md:text-6xl text-offBlue">Update Profile</h1>
          <SettingsImage width={250} />
        </section>
        <section className="w-full h-screen bg-accent max-w-6xl">
          <form className="text-black flex items-center flex-col w-full">
            <div className="flex flex-col lg:flex-row gap-10 w-full">
              <div className="w-full flex flex-col gap-5">
                <div className="form-control w-full">
                  <label htmlFor="firstName" className="label">
                    <span>First Name</span>
                  </label>
                  <input type="text" name="firstName" placeholder="Enter your first name" className="input input-bordered w-full bg-secondary" />
                </div>
                <div className="form-control w-full ">
                  <label htmlFor="lastName" className="label">
                    <span>Last Name</span>
                  </label>
                  <input type="text" name="lastName" placeholder="Enter your last name" className="input input-bordered w-full bg-secondary" />
                </div>
                <div className="form-control w-full ">
                  <label htmlFor="jobTitle" className="label">
                    <span>Job Title</span>
                  </label>
                  <input type="text" name="jobTitle" placeholder="Enter your job title" className="input input-bordered w-full bg-secondary" />
                </div>
                <div className="form-control w-full">
                  <label htmlFor="avatarURL" className="label">
                    <span>Avatar URL</span>
                  </label>
                  <input name="avatarURL" type="textarea" placeholder="Enter your avatar url" className="input input-bordered w-full bg-secondary" />
                </div>
              </div>
              <div className="w-full flex flex-col gap-5">
                <div className="form-control w-full">
                  <label htmlFor="bio" className="label">
                    <span>Your bio</span>
                  </label>
                  <textarea name="bio" className="textarea textarea-bordered h-24 lg:h-[9.8rem] bg-secondary" placeholder="Enter your bio"></textarea>
                </div>
                <div className="form-control w-full">
                  <label htmlFor="city" className="label">
                    <span>City</span>
                  </label>
                  <input name="city" type="textarea" placeholder="Enter your city" className="input input-bordered w-full bg-secondary" />
                </div>
                <div className="form-control w-full">
                  <label htmlFor="state" className="label">
                    <span>State</span>
                  </label>
                  <input name="state" type="textarea" placeholder="Enter your state" className="input input-bordered w-full bg-secondary" />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-10">
              <button className="btn text-secondary mx-auto tracking-widest bg-primary-light hover:bg-primary-dark shadow-lg hover:shadow-xl active:shadow-lg">Cancel</button>
              <button className="btn text-secondary mx-auto tracking-widest bg-primary-light hover:bg-primary-dark shadow-lg hover:shadow-xl active:shadow-lg">Update Profile</button>
            </div>
          </form>
        </section>
      </main>
    </>
  )
}

export default ProfileSettingsPage