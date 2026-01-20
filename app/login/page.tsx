import LoginForm from "@/components/common/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex flex-col-reverse lg:flex-row lg:min-h-screen">
      <LoginForm />
      <div className="w-full lg:w-1/2 bg-bg-component flex flex-col items-center lg:items-start justify-center px-6 sm:px-12 lg:px-18 py-8 sm:py-12 lg:py-0 text-white">
        <div className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6 text-center lg:text-left">
          ticktock
        </div>
        <p className="text-sm sm:text-base lg:text-lg text-center lg:text-left max-w-md leading-relaxed">
          Introducing ticktock, our cutting-edge timesheet web application
          designed to revolutionize how you manage employee work hours. With
          ticktock, you can effortlessly track and monitor employee attendance
          and productivity from anywhere, anytime, using any internet-connected
          device.
        </p>
      </div>
    </main>
  );
}
