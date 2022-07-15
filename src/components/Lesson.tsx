import {CheckCircle, Lock} from "phosphor-react"
import { isPast, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'
import { Link, useParams } from "react-router-dom";
import classNames from 'classnames';

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: "live" | "class";
}
export function Lesson(props: LessonProps) {
  const { slug } = useParams<{slug: string}>();
  const isLessonAvailable = isPast(props.availableAt);
  const availableDateFormatted = format(props.availableAt, "EEEE' • 'd' de 'MMMM' • 'K'h'mm", {
    locale: ptBR
  });
  const isActiveLesson = slug === props.slug;
  return (
    <Link to={`/event/lesson/${props.slug}`} className="group">
      <span className="text-gray-300">
        {availableDateFormatted}
      </span>
      <div className={classNames("rounded group-hover:border-green-500 border border-gray-500 p-4 mt-2", {
        "bg-green-500": isActiveLesson,
      })}>
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span className={classNames("flex items-center gap-2 text-sm font-medium", {
              "text-white": isActiveLesson,
              "text-blue-500": !isActiveLesson
            })}>
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span className={classNames("flex items-center gap-2 text-sm font-medium text-orange-500", {
            })}>
              <Lock size={20} />
              Em breve
            </span>
          )}
          <span className={`text-xs rounded px-2 py-[2px] text-white border border-green-300 font-bold uppercase border-green-300 ${isActiveLesson && "border-white"}`}>
            {props.type === "live" ? "AO VIVO" : "AULA PRÁTICA"}
          </span>
        </header>
        <strong className={classNames("block mt-5", {
          "text-white": isActiveLesson,
          "text-gray-200": !isActiveLesson
        })}>
          {props.title}
        </strong>
      </div>
    </Link>
  )
}