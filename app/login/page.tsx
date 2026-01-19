import LoginForm from "@/components/common/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex h-screen">
      <LoginForm />
      <div className="w-1/2 bg-bg-component flex flex-col items-left justify-center px-18 text-white">
        <div className="text-5xl font-bold mb-6">ticktock</div>
        <p className="text-lg text-left max-w-md leading-relaxed">
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
